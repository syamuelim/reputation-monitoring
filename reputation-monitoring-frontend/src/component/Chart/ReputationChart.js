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
    if (width > 420) {
      return size;
    }
    return (width / 420) * size;
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
    var tempX = [];
    state.influencers.forEach(async (influencer) => {
      if (influencer.selected == true) {
        // find reputation data
        const reputationResponse = await reputationService.getReputationById(
          influencer.id,
          state.startDate,
          state.endDate
        );

        // create data matrix
        // if there is no record
        if (tempData.length == 0) {
          tempData.push(formDataObject(reputationResponse.data));
          tempX.push(
            reputationResponse.data.map(({ reputationAt }) =>
              new Date(reputationAt).toLocaleDateString("en-GB", {
                year: "2-digit",
                month: "short",
              })
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
          console.log(tempX);
          setXAxis(tempX[0]);
          setData(tempData);
          setLoading(false);
        }
      }
    });
  };

  const Decorator = ({ x, y, data }) => {
    return data.map((valueMain, index) =>
      valueMain.data.map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={4}
          stroke={valueMain.svg.stroke}
          fill={"white"}
        />
      ))
    );
  };

  const Shadow = ({ line }) => (
    <Path
      key={"shadow"}
      y={2}
      d={line}
      fill={"none"}
      strokeWidth={4}
      stroke={"rgba(134, 65, 244, 0.2)"}
    />
  );

  function formDataObject(data) {
    let kol = {};
    if (data.length > 0) {
      kol = state.influencers.find((obj) => obj.id == data[0].kolId);
    }
    var dataObject = {
      data: data.map(({ rating }) => rating),
      svg: { stroke: kol.colorCode }, // random color
    };
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
              width: "97%",
              height: apx(300),
              alignSelf: "center",
            }}
          >
            <YAxis
              style={{ width: "5%" }}
              data={data[0].data}
              contentInset={{ top: apx(20), bottom: apx(20) }}
              svg={{ fontSize: apx(16), fill: "#617485" }}
              numberOfTicks={5}
            />
            <View style={{ flex: 1 }}>
              <LineChart
                style={{ flex: 1 }}
                data={data}
                curve={shape.curveMonotoneX} //curve line
                contentInset={{
                  top: apx(20),
                  bottom: apx(20),
                  left: apx(10),
                  right: apx(10),
                }}
                animate={null}
                animationDuration={0}
                strokeWidth={undefined}
                svg={{ fill: "url(#gradient)", strokeWidth: 3 }}
              >
                <Grid />
                <Shadow />
                <Decorator />
              </LineChart>
            </View>
          </View>
          <XAxis
            style={{
              alignSelf: "center",
              width: "92%",
              height: apx(30),
            }}
            data={data[0].data}
            formatLabel={(value, index) =>
              index % 2 == 1 ? null : xAxis[index]
            }
            svg={{
              fontSize: apx(16),
              fill: "#617485",
              originY: 35,
              y: 10,
              x: 10,
            }}
            contentInset={{ left: apx(20) }}
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
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
});
