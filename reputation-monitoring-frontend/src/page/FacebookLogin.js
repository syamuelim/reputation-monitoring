import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState, useEffect, setState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

import { ListItem } from "@react-native-material/core";
import * as testService from "../service/Test";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";


const FacebookLoginScreen = ({ navigation }) => {
  WebBrowser.maybeCompleteAuthSession();
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "652157000425074",
    configId: "3654644834792585",
  })
  const [students, setStudent] = useState([]);

  //#region variable
  //#endregion

  //#region effect
  useEffect(() => {
    //loadStudents();
  }, []);

  useEffect(() => {
    console.log("set", students);
  }, [students]);


  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
        console.log(JSON.stringify(response, null, 2));
      })();
    }
  }, [response]);

  const handlePressAsync = async () => {
    const result = await promptAsync();
    if (result.type !== "success") {
      return;
    }
  };
  //#endregion

  //#region load service
  let loadStudents = async () => {
    const response = await testService.getStudents();
    setStudent(response.data);
  };

  
  //#endregion
  return (
    <View style={styles.container}>
      {user ? (
        <Profile user={user} />
        ) : (
        <Button
          disabled={!request}
          title="Sign in with Facebook"
          onPress={handlePressAsync}
          />
      )}
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    alignItems: "center",
  },
  name: {
    fontSize: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

function Profile({ user }) {
return (
  <View style={styles.profile}>
    <Image source={{ uri: user.picture.data.url }} style={styles.image} />
    <Text style={styles.name}>{user.name}</Text>
    <Text>ID: {user.id}</Text>
  </View>
);
}

export default FacebookLoginScreen;
