import React, { Component } from "react";
import firebase from "react-native-firebase";
import { Button } from "react-native";

export default class LogoutScreen extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  async logout() {
    try {
      await firebase.auth().signOut();
      this.props.navigation.navigate("LoginScreen");
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return <Button onPress={this.logout} title="Log out" color="red" />;
  }
}
