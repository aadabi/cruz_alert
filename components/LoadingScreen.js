import React, { Component } from "react";
import { Text } from "react-native";
import firebase from "react-native-firebase";

export default class LoadingScreen extends Component {
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("MainNavigation");
      } else {
        this.props.navigation.navigate("LoginScreen");
      }
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    return <Text>Loading</Text>;
  }
}
