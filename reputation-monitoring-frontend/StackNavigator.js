import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/page/Home";
import FacebookLoginScreen from "./src/page/FacebookLogin";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="facebook"
				options={{
					headerShown: false,
				}}
				component={FacebookLoginScreen}
			/>
				<Stack.Screen
					name="*"
					options={{
						headerShown: false,
					}}
					component={HomeScreen}
				/>
			{/* <Navbar /> */}
		</Stack.Navigator>
	);
};

export default StackNavigator;
