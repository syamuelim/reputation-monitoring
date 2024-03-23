import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/page/Home";
import DashboardScreen from "./src/page/Dashboard";
import FacebookLoginScreen from "./src/page/FacebookLogin";
import Footer from "./src/component/Footer";
import LineChartExample from "./src/component/Chart/ReputationChart";
import { InfluencerProvider } from "./src/service/StateContext";
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <InfluencerProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          footer: { Footer },
        }}
      >
        <Stack.Screen name="facebook" component={FacebookLoginScreen} />
        {<Stack.Screen name="dashboard" component={DashboardScreen} />}
        {<Stack.Screen name="chart" component={LineChartExample} />}
        {/* <Stack.Screen name="home" component={HomeScreen} />  */}
        {/* <Navbar /> */}
      </Stack.Navigator>
    </InfluencerProvider>
  );
};

export default StackNavigator;
