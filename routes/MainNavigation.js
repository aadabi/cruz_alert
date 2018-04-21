import React from "react";
import firebase from "react-native-firebase";
import { Text } from "react-native";
import { DrawerNavigator, StackNavigator } from "react-navigation";
import SubmitReportScreen from "../components/SubmitReportScreen";
import DrawerContent from "../components/DrawerContent";
import PublicReportsFeed from "../components/PublicReportsFeed";

const MainDrawerNavigation = DrawerNavigator(
  {
    Home: { screen: PublicReportsFeed }
  },
  {
    contentComponent: DrawerContent
  }
);

const MainNavigation = StackNavigator(
  {
    Main: { screen: MainDrawerNavigation },
    SubmitReportModal: { screen: SubmitReportScreen }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export default MainNavigation;
