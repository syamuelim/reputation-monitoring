import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ReputationChart from "./ReputationChart";
import AudienceChart from "./AudienceChart";


const ChartHub = ({ selectedChartIndex }) => {
  function Chart({selectedChartIndex}) {
    if(selectedChartIndex === 0) {
      return <ReputationChart></ReputationChart>;
    } else if (selectedChartIndex === 1) {
      return <AudienceChart></AudienceChart>
    }
  };
  return (
    <SafeAreaView>
      <Chart selectedChartIndex={selectedChartIndex}></Chart>
    </SafeAreaView>
  );
};

export default ChartHub;
