import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Button
} from "react-native";
import firebase from "react-native-firebase";
import ReportList from "./ReportList";
import { getPublicReports } from "../api";

class PublicReportsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: []
    };
  }

  static navigationOptions = {
    drawerLabel: "Home reports",
    drawerIcon: () => (
      <Image
        source={require("../components/images/home.png")}
        style={{ width: 40, height: 40, resizeMode: "stretch" }}
      />
    )
  };

  async componentDidMount() {
    const reports = await getPublicReports();
    this.setState({ reports });
  }

  render() {
    return <ReportList reports={this.state.reports} />;
  }
}

const Detail = props => {
  return (
    <View>
      <Text style={styles.detailsTitle}>
        {" "}
        {props.navigation.state.params.category}{" "}
      </Text>
      <Text style={styles.detailsText}>
        {" "}
        {props.navigation.state.params.description}{" "}
      </Text>
    </View>
  );
};

const PublicReportsFeedStackNavigator = StackNavigator({
  PublicReportsFeed: {
    screen: PublicReportsFeed,
    navigationOptions: ({ navigation }) => ({
      backgroundColor: "#FFFF52",
      headerLeft: (
        <Text
          onPress={() => {
            console.log("pressed drawer open");
            navigation.navigate("DrawerOpen");
          }}
          style={{ paddingLeft: 20 }}
        >
          Menu
        </Text>
      ),
      headerRight: (
        <TouchableHighlight
          onPress={() => {
            navigation.navigate("SubmitReportModal");
          }}
          style={{ paddingRight: 20 }}
        >
          <Text>Submit Report</Text>
        </TouchableHighlight>
      )
    })
  },
  Detail: { screen: Detail }
});

export default PublicReportsFeedStackNavigator;
