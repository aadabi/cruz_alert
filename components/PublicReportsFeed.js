import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { Text } from "react-native";

class PublicReportsFeed extends Component {
  render() {
    return (
      <Text style={{ textAlign: "center", padding: 25 }}>
        Public reports feed will go here!
      </Text>
    );
  }
}

const PublicReportsFeedStackNavigator = StackNavigator({
  PublicReportsFeed: {
    screen: PublicReportsFeed,
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
        <Text onPress={() => alert("pressed")} style={{ paddingRight: 20 }}>
          New Report
        </Text>
      )
    })
  }
});

export default PublicReportsFeedStackNavigator;
