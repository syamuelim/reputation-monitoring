import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/page/Home";
import DashboardScreen from "./src/page/Dashboard";
import FacebookLoginScreen from "./src/page/FacebookLogin";
import Footer from "./src/component/Footer";
import LineChartExample from "./src/component/Chart/ReputationChart";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        footer: { Footer },
      }}
      >
      { <Stack.Screen name="dashboard" component={DashboardScreen} /> }
      { <Stack.Screen name="chart" component={LineChartExample} /> }
      {/* <Stack.Screen name="home" component={HomeScreen} />  */}
      <Stack.Screen name="facebook" component={FacebookLoginScreen} />
      {/* <Navbar /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
