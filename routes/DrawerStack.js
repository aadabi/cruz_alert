import React from "react";
import { Text } from "react-native";
import { DrawerNavigator } from "react-navigation";
import LogoutScreen from "../components/LogoutScreen";
import SubmitReportScreen from "../components/SubmitReportScreen";

const DrawerStack = DrawerNavigator(
  {
    LogoutScreen: { screen: LogoutScreen },
    SubmitReportScreen: { screen: SubmitReportScreen }
  },
  {
    headerMode: "float",
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <Text onPress={() => navigation.navigate("DrawerOpen")}>Menu</Text>
      )
    })
  }
);

export default DrawerStack;
