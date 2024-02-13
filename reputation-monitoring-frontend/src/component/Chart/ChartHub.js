import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ReputationChart from "./ReputationChart";
import ChartPanal from "./ChartPanal";
import Container from "@mui/material/Box";
import Grid from '@mui/system/Unstable_Grid';


const ChartHub = ({ selectedChartIndex }) => {
  function Chart({selectedChartIndex}) {
    if(selectedChartIndex === 0) {
      return <ReputationChart></ReputationChart>;
    }
  };
  return (
    <SafeAreaView>
      <Chart selectedChartIndex={selectedChartIndex}></Chart>
    </SafeAreaView>
  );
};

export default ChartHub;
