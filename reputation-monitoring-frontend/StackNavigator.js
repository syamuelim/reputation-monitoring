import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/page/Home";
import FacebookLoginScreen from "./src/page/FacebookLogin";
import Footer from "./src/component/Footer";
import LineChartComponent from "./src/component/LineChart";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        footer: { Footer },
      }}
    >
      <Stack.Screen name="chart" component={LineChartComponent} />
      <Stack.Screen name="home" component={HomeScreen} /> 
      <Stack.Screen name="facebook" component={FacebookLoginScreen} />
      {/* <Navbar /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
