import React, { Component } from "react";
import { View, Button, Alert } from "react-native";
import { GoogleSignin } from "react-native-google-signin";
import firebase from "react-native-firebase";

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
      await GoogleSignin.configure();
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          onPress={this.googleLogin}
          title="Log in with Google"
          color="#841584"
        />
      </View>
    );
  }
}
