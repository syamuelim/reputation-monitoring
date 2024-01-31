import { View, Text, Button, StyleSheet, Image, TextInput } from "react-native";
import React, { useState, useEffect, setState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

import { ListItem } from "@react-native-material/core";
import * as testService from "../service/Test";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import * as facebookService from "../service/FacebookService";

import { facebookPermission } from "../Config/Menu";


const FacebookLoginScreen = ({ navigation }) => {
  WebBrowser.maybeCompleteAuthSession();
  const [user, setUser] = useState(null);
  const [pageId, setPageId] = useState(null);
  const [igUserId, setIgUserId] = useState(null);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "652157000425074",
    scopes: facebookPermission,
    configId: "3654644834792585"
  })
  const [students, setStudent] = useState([]);
  const [facebookResponse, setFacebookResponse] = useState(null);

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
      })();
    }
  }, [response]);

  useEffect(() => {
    loadData()
  }, [user])

  useEffect(() => {
    loadIgUserId()
  }, [pageId])

  useEffect(() => {
    // loadBusinessAccount()
  }, [igUserId])

  const handlePressAsync = async () => {
    const result = await promptAsync();
    if (result.type !== "success") {
      return;
    }
  };


  let loadData = async () => {
    if (response) {
      const res = await facebookService.getPageId(response.authentication.accessToken);
      setPageId(res.data.data[0].id)
    }
  };

  let loadIgUserId = async () => {
    if (response && pageId) {
      const res = await facebookService.getInstagramUserId(pageId, response.authentication.accessToken);
      setIgUserId(res.data.instagram_business_account.id)
    }
  }

  let loadBusinessAccount = async (text) => {
    if (igUserId && response && text) {
      const res = await facebookService.getBusinessAccount(igUserId, text, response.authentication.accessToken);
      download(res.data, text)
    }
  }

  //#endregion

  return (
    <View style={styles.container}>
      {user ? (
        <Profile user={user} loadBusinessAccount={loadBusinessAccount}/>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});


function Profile({ user, loadBusinessAccount }) {
  const [userName, onChangeText] = useState('');
  const handleConfirm = () => {
    loadBusinessAccount(userName)
  }
  return (
    <View style={styles.profile}>
      <Image source={{ uri: user.picture.data.url }} style={styles.image} />
      <Text style={styles.name}>{user.name}</Text>
      <Text>ID: {user.id}</Text>
      <TextInput
        style={styles.input}
        onChangeText={userName => onChangeText(userName)}
        value={userName}
      />
      <Button
        title="Confim"
        onPress={handleConfirm}
      />
    </View>
  );
}

function download(jsonData, fileName) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(jsonData)], { type: `application/json` }));
  a.download = fileName + '.js';
  a.click();
}



export default FacebookLoginScreen;
