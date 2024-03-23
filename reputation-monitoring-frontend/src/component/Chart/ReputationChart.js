import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";
import { Circle, Path, Text as SvgText } from "react-native-svg";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import * as shape from "d3-shape";
import { useInfluencerContext } from "../../service/StateContext";

import * as reputationService from "../../service/ReputationService";

export default ReputationChart;

function ReputationChart() {
  const apx = (size = 0) => {
    let width = Dimensions.get("window").width;
    if (width > 750) {
      return size;
    }
    return (width / 750) * size;
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [xAxis, setXAxis] = useState([]);
  const { state, dispatch } = useInfluencerContext();

  useEffect(() => {
    loadReputationById(
      ["1", "54"],
      "2023-01-01T00:00:00",
      "2024-01-01T00:00:00"
    );
  }, []);

  useEffect(() => {
    setLoading(true);
    loadReputationById(
      ["1", "54"],
      "2023-01-01T00:00:00",
      "2024-01-01T00:00:00"
    );
  }, [state.influencers]);

  let loadReputationById = async (influencerIds, startDate, endDate) => {
    var tempData = [];
    state.influencers.forEach(async (influencer) => {
      if (influencer.selected == true) {
        console.log(influencer);
        // find reputation data
        const reputationResponse = await reputationService.getReputationById(
          influencer.id,
          startDate,
          endDate
        );

        // create data matrix
        // if there is no record
        if (tempData.length == 0) {
          tempData.push(formDataObject(reputationResponse.data));
          setXAxis(
            reputationResponse.data.map(({ reputationAt }) =>
              new Date(reputationAt).toLocaleDateString("en-US")
            )
          );
        } else {
          // if records exist
          tempData.push(formDataObject(reputationResponse.data));
        }

        if (
          tempData.length ===
          state.influencers.filter(function (obj) {
            return obj.selected === true;
          }).length
        ) {
          // set the data to the table
          setData(tempData);
          setLoading(false);
        }
      }
    });
  };

  const Decorator = ({ x, y, data }) => {
    return data.map((value, index) =>
      value.data.map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={4}
          stroke={"rgb(134, 65, 244)"}
          fill={"white"}
        />
      ))
    );
  };

  function formDataObject(data) {
    var dataObject = {
      data: data.map(({ rating }) => rating),
      svg: { stroke: "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);})}, // random color
    };
    console.log(dataObject)
    return dataObject;
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <View>
          <View
            style={{
              flexDirection: "row",
              width: apx(750),
              height: apx(270),
              alignSelf: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <LineChart
                style={{ flex: 1 }}
                data={data}
                curve={shape.curveMonotoneX} //curve line
                contentInset={{ top: apx(40), bottom: apx(40) }}
                animate
                svg={{ fill: "url(#gradient)" }}
              >
                <Grid />
                <Decorator />
              </LineChart>
            </View>

            <YAxis
              style={{ width: apx(130) }}
              data={data[0].data}
              contentInset={{ top: apx(40), bottom: apx(40) }}
              svg={{ fontSize: apx(20), fill: "#617485" }}
            />
          </View>
          <XAxis
            style={{
              alignSelf: "center",
              // marginTop: apx(57),
              width: apx(750),
              height: apx(60),
            }}
            numberOfTicks={7}
            data={data[0].data}
            formatLabel={(value, index) => xAxis[value]}
            contentInset={{
              left: apx(36),
              right: apx(130),
            }}
            svg={{
              fontSize: apx(20),
              fill: "#617485",
              y: apx(20),
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    display: "flex",
    backgroundColor: "white",
    border: "1px solid #c6c6c6",
    borderRadius: "8px",
  },
});
