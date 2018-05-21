import React, { Component } from "react";
import { SwitchNavigator } from "react-navigation";
import MainNavigation from "./src/routes/MainNavigation";
import LoginScreen from "./src/components/LoginScreen";
import LoadingScreen from "./src/components/LoadingScreen";

const RootStack = SwitchNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    MainNavigation: { screen: MainNavigation },
    LoadingScreen: { screen: LoadingScreen }
  },
  {
    initialRouteName: "LoadingScreen"
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
