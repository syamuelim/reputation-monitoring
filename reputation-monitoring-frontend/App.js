
import { StyleSheet, Text, View, LogBox } from "react-native";
import StackNavigator from "./StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";

import axios from 'axios';

export default function App() {
	return (
		<PaperProvider>
			<SafeAreaProvider>
				<NavigationContainer>
					<StackNavigator />
				</NavigationContainer>
			</SafeAreaProvider>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
