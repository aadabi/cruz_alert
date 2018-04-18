import React, { Component } from "react";
import { SwitchNavigator } from "react-navigation";
import MainNavigation from "./routes/MainNavigation";
import LoginScreen from "./components/LoginScreen";
import LoadingScreen from "./components/LoadingScreen";

const RootStack = SwitchNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    DrawerStack: { screen: MainNavigation },
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
