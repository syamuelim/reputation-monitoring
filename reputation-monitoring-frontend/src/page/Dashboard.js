import { View, Text, Button } from "react-native";
import  React, {useState}  from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as testService from "../service/Test";
import ChartHub from "../component/Chart/ChartHub";
import ChartPanal from "../component/Chart/ChartPanal";
import Container from "@mui/material/Box";
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';

const DashboardScreen = ({ navigation }) => {
  const [selectedChartIndex, setSelectedChartIndex] = useState(0);
  const handleChartPanalMessage = (index) => {
    setSelectedChartIndex(index)
  };
  return (
    <SafeAreaView>
      <Container>
        <Grid container rowGap={1} >
          <Grid xs={12} sm={10}>
             <ChartHub selectedChartIndex={selectedChartIndex}></ChartHub>
          </Grid>
          <Grid xs={12} sm={2}>
            <ChartPanal onMessage={handleChartPanalMessage}></ChartPanal>
          </Grid>
        </Grid>
      </Container>
    </SafeAreaView>
  );
};

export default DashboardScreen;
