import React from "react";
import firebase from "react-native-firebase";
import { Text } from "react-native";
import { DrawerNavigator } from "react-navigation";
import SubmitReportScreen from "../components/SubmitReportScreen";
import DrawerContent from "../components/DrawerContent";

const MainNavigation = DrawerNavigator(
  {
    SubmitReportScreen: { screen: SubmitReportScreen }
  },
  {
    // navigationOptions: ({ navigation }) => ({
    //   headerLeft: (
    //     <Text onPress={() => navigation.navigate("DrawerOpen")}>Menu</Text>
    //   )
    // }),
    contentComponent: DrawerContent
  }
);

export default MainNavigation;
