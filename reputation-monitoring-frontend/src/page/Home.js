import { View, Text, Button } from "react-native";
import React, { useState, useEffect, setState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListItem } from "@react-native-material/core";
import * as testService from "../service/Test";

const HomeScreen = ({ navigation }) => {
  const [students, setStudent] = useState([]);

  //#region variable
  //#endregion

  //#region effect
  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    console.log("set", students);
  }, [students]);
  //#endregion

  //#region load service
  let loadStudents = async () => {
    const response = await testService.getStudents();
    setStudent(response.data);
  };
  //#endregion
  return (
    <SafeAreaView>
      <View>
        <Text>Home Page</Text>
        {students.map((student, index) => (
          <View key={index}>
            <ListItem 
                title= {'Id: ' +student.id} 
                secondaryText={'Name: ' + student.name}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
