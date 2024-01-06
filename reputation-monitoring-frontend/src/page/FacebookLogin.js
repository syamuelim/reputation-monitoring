import { View, Text, Button, StyleSheet, Image } from "react-native";
import React, { useState, useEffect, setState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

import { ListItem } from "@react-native-material/core";
import * as testService from "../service/Test";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";

import {facebookPermission} from "../Config/Menu";


const FacebookLoginScreen = ({ navigation }) => {
  WebBrowser.maybeCompleteAuthSession();
  const [user, setUser] = useState(null);

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "706729161328080",
    scopes: facebookPermission,
    configId: "3654644834792585"
  })
  const [students, setStudent] = useState([]);

  //#region variable
  //#endregion

  //#region effect
  useEffect(() => {
    //loadStudents();
  }, []);


  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email,birthday,picture.type(large)&access_token=${response.authentication.accessToken}`
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
        console.log(userInfoResponse);
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
