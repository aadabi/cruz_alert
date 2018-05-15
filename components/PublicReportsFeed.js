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
import CampusMap from "./CampusMap";

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
      <View>
        <FlatList
          data={this.state.reports}
          renderItem={({ item }) => {
            console.log(item);
            return <Report report={item} />;
          }}
        />
      </View>
    );
  }
}

const Report = props => {
  console.log(props);
  return (
    <View>
      <Text>{props.report.category}</Text>
      <Text>{props.report.description}</Text>
    </View>
  );
};

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

const PublicTabNavigation = TabNavigator(
  {
    Feed: { screen: PublicReportsFeed },
    CampusMap: { screen: CampusMap }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "#FFFF52",
      swipeEnabled: false,
      activeBackgroundColor: "#0067A6",
      inactiveTintColor: "#D1D1D1",
      labelStyle: {
        fontSize: 15,
        padding: 1
      }
    }
  }
);

const PublicReportsFeedStackNavigator = StackNavigator({
  PublicReportsFeed: {
    screen: PublicTabNavigation,
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

var styles = StyleSheet.create({});

export default PublicReportsFeedStackNavigator;
