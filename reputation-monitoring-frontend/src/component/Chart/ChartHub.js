import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ReputationChart from "./ReputationChart";


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
