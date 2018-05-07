import React, { Component } from "react";
import {
  View,
  Button,
  Alert,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import { GoogleSignin } from "react-native-google-signin";
import firebase from "react-native-firebase";

import { LoginStyle } from "../components/LoginLayout";
import { ButtonStyle } from "../components/ButtonLayout";
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.googleLogin = this.googleLogin.bind(this);
  }

  async addUserToDatabase(user) {
    const { uid, displayName, email } = user;
    firebase
      .database()
      .ref("/users/" + uid)
      .set({
        displayName,
        email
      });
  }

  async googleLogin() {
    try {
      await GoogleSignin.configure({
        iosClientId:
          "764779446389-4nn97kusaue5slp3pbnar1folng5hvsa.apps.googleusercontent.com"
      });
      const data = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );
      const {
        user
      } = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      if (user.email.substr(user.email.length - 8) != "ucsc.edu") {
        Alert.alert("Please use your UCSC email to log in.");
        await GoogleSignin.signOut();
      } else {
        await this.addUserToDatabase(user);
        this.props.navigation.navigate("MainNavigation");
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (

      <View style = {LoginStyle.ScreenCont}>
        <Image resizeMode="contain" style={LoginStyle.logo} source= {require('../components/images/Logoldpi.png')} />
      <View style={LoginStyle.ScreenCont}>
        <Image
          resizeMode="contain"
          style={LoginStyle.logo}
          source={require("../components/images/RSCRuzlogo.png")}
        />
        <View style={ButtonStyle.ButtonContainer}>
          <View style={LoginStyle.loginContainer}>
            <TouchableOpacity
              style={ButtonStyle.GoogleDesign}
              activeOpacity={0.5}
              onPress={this.googleLogin}
            >
              <Image
                source={require("../components/images/google-logo.png")}
                style={ButtonStyle.IconLayout}
              />

              <View style={ButtonStyle.ButtonDivider} />

              <Text style={ButtonStyle.TextLayout}> Login with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
