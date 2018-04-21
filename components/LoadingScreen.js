import React, { Component } from "react";
import { Text } from "react-native";
import firebase from "react-native-firebase";

export default class LoadingScreen extends Component {
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("attempting to navigate to main navigation");
        this.props.navigation.navigate("MainNavigation");
        console.log("???????");
        console.log(this.props.navigation);
      } else {
        console.log("user logged out");
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
