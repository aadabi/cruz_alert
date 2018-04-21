import React from "react";
import firebase from "react-native-firebase";
import { Text } from "react-native";
import { DrawerNavigator } from "react-navigation";
import SubmitReportScreen from "../components/SubmitReportScreen";
import DrawerContent from "../components/DrawerContent";
import PublicReportsFeed from "../components/PublicReportsFeed";

const MainNavigation = DrawerNavigator(
  {
    Home: { screen: PublicReportsFeed },
    SubmitReportScreen: { screen: SubmitReportScreen }
  },
  {
    contentComponent: DrawerContent
  }
);

export default MainNavigation;
