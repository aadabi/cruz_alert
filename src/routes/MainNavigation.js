import React from "react";
import firebase from "react-native-firebase";
import { Text } from "react-native";
import { DrawerNavigator, StackNavigator } from "react-navigation";
import SubmitReportScreen from "../components/SubmitReportScreen";
import DrawerContent from "../components/DrawerContent";
import PublicReportsFeed from "../components/PublicReportsFeed";
import UserReports from "../components/UserReports";
import UploadScreen from "../components/UploadScreen";
import CameraScreen from "../components/CameraScreen";

const MainDrawerNavigation = DrawerNavigator(
  {
    Home: { screen: PublicReportsFeed },
    UserReports: { screen: UserReports },
     CameraScreenModal: { screen: CameraScreen },
  },
  {
    contentComponent: DrawerContent
  }
);

const MainNavigation = StackNavigator(
  {
   Main: { screen: MainDrawerNavigation },
   SubmitReportModal: { screen: SubmitReportScreen },
   UploadScreenModal: { screen: UploadScreen }

 },
  {
    mode: "modal",
    headerMode: "none",
    backgroundColor: '#005581'
  }
);

export default MainNavigation;
