import React, { Component } from "react";
import { Text } from "react-native";
import { StackNavigator } from "react-navigation";

class UserReports extends Component {
  static navigationOptions = {
    drawerLabel: "Your Reports"
  };

  render() {
    return (
      <Text style={{ textAlign: "center", padding: 25 }}>
        User reports feed will go here!
      </Text>
    );
  }
}

const UserReportsStackNavigator = StackNavigator({
  UserReports: {
    screen: UserReports,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <Text
          onPress={() => navigation.navigate("DrawerOpen")}
          style={{ paddingLeft: 20 }}
        >
          Menu
        </Text>
      ),
      headerRight: (
        <Text
          onPress={() => navigation.navigate("SubmitReportModal")}
          style={{ paddingRight: 20 }}
        >
          New Report
        </Text>
      )
    })
  }
});

export default UserReportsStackNavigator;
