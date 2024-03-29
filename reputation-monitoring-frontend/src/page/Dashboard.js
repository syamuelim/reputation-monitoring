import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChartHub from "../component/Chart/ChartHub";
import ChartPanal from "../component/Chart/ChartPanal";
import InstagramPostListView from "../component/InstagramPostListView";
import Header from "../component/header";
import Container from "@mui/material/Box";
import Grid from "@mui/system/Unstable_Grid";
import styled from "@mui/system/styled";

const DashboardScreen = ({ navigation }) => {
  // set default chart
  const [selectedChartIndex, setSelectedChartIndex] = useState(0);
  const handleChartPanalMessage = (index) => {
    setSelectedChartIndex(index);
  };
  return (
    <SafeAreaView>
      <Container paddingLeft={"8px"} paddingRight={"8px"}>
        <Grid container rowGap={2} columnSpacing={{ md: 1 }}>
          <Grid xs={12} sm={12} md={12}>
            <Header></Header>
          </Grid>        
            <Grid xs={12} sm={12} md={10}>
            <ChartHub selectedChartIndex={selectedChartIndex}></ChartHub>
          </Grid>
          <Grid xs={12} sm={12} md={2}>
            <ChartPanal onMessage={handleChartPanalMessage}></ChartPanal>
          </Grid>
          <Grid xs={9}>
            <InstagramPostListView instagramUserId={102}></InstagramPostListView>
          </Grid>
        </Grid>
      </Container>
    </SafeAreaView>
  );
};

export default DashboardScreen;
