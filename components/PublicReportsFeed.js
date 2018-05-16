import React, { Component } from "react";
import { StackNavigator, TabNavigator } from "react-navigation";
import {
  Alert,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  FlatList
} from "react-native";
import firebase from "react-native-firebase";
import Report from "./Report";

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

  fetchReports() {
    const reportsRef = firebase.database().ref("/reports/public");
    reportsRef.once("value", snap => {
      const reports = [];
      snap.forEach(child => {
        reports.push({
          category: child.val().category,
          description: child.val().description
        });
      });
      reports.reverse();
      this.setState({ reports });
    });
  }

  componentDidMount() {
    this.fetchReports();
  }

  render() {
    return (
      <FlatList
        data={this.state.reports}
        renderItem={({ item }) => {
          return <Report report={item} />;
        }}
      />
    );
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
  },
  Detail: { screen: Detail }
});

export default PublicReportsFeedStackNavigator;
