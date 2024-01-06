import React, { useState, useEffect, setState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { WebView } from "react-native-webview";
import { Chart } from "react-google-charts";
import * as reputationService from "../service/ReputationService";
import * as testService from "../service/Test";

const LineChartComponent = ({ navigation }) => {
  const [reputation, setReputation] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [influencerIds, setInfluencerIds] = useState([]);
  const [xAxis, setXAxis] = useState([]);
  const [options, setOptions] = useState({
    title: "Reputation Score",
    curveType: "function",
    legend: { position: "bottom" },
    hAxis: {},
  });

  useEffect(() => {
    loadReputationById(
      ["1", "54"],
      "2023-01-01T00:00:00",
      "2024-01-01T00:00:00"
    );
  }, []);

  useEffect(() => {
    setOptions({
      title: "Reputation Score",
      curveType: "function",
      legend: { position: "bottom" },
    });
  }, [xAxis]);

  let loadReputationById = async (influencerIds, startDate, endDate) => {
    var tempData = [["Date"]];
    var tempXAxis = [];
    influencerIds.forEach(async (influencerId) => {
      // find reputation data
      const reputationResponse = await reputationService.getReputationById(
        influencerId,
        startDate,
        endDate
      );
      setReputation(reputationResponse.data);
      // find influencer data
      const influencerResponse = await testService.getInfluencerById(
        influencerId
      );

      var dataWithOutChartValue = tempData.slice(1);
      tempData[0].push(influencerResponse.data.name);
      // create data matrix
      // if there is no record
      if (dataWithOutChartValue.length == 0) {
        reputationResponse.data.forEach((item) => {
          tempXAxis.push(new Date(item.reputationAt));
          tempData.push([new Date(item.reputationAt), item.rating]);
        });
        setXAxis(tempXAxis);
      } else {
        // if records exist
        for (let i = 0; i < reputationResponse.data.length; i++) {
          dataWithOutChartValue[i].push(reputationResponse.data[i].rating);
          tempData[i + 1] = dataWithOutChartValue[i];
        }
      }
    });
    // set the data to the table
    setData(tempData);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading Reputation Data</Text>
      ) : (
        <Chart
          chartType="LineChart"
          width="80%"
          height="200px"
          data={data}
          options={options}
          legendToggle
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "8px",
    justifyContent: "center",
    display: "flex",
    backgroundColor: "white",
  },
});

export default LineChartComponent;
