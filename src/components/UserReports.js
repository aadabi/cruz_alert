import React, { Component } from "react";
import { StackNavigator, TabNavigator } from "react-navigation";
import {
  Alert,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ListView
} from "react-native";
import firebase from "react-native-firebase";
import ReportList from "./ReportList";
import { getUserReports } from "../api";

class UserReports extends Component {
  static navigationOptions = {
    drawerLabel: "Own Reports",
    drawerIcon: () => (
      <Image
        source={require("../components/images/user-icon.png")}
        style={{ width: 40, height: 40, resizeMode: "stretch" }}
      />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      reports: []
    };
  }

  async fetchReports() {
    const reports = await getUserReports(firebase.auth().currentUser.uid);
    this.setState({ reports });
  }

  componentDidMount() {
    this.fetchReports();
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

const UserReportsStackNavigator = StackNavigator({
  UserReports: {
    screen: UserReports,
    navigationOptions: ({ navigation }) => ({
      backgroundColor: "#FFFF52",
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.navigate("DrawerOpen")}
          style={{ paddingLeft: 20 }}
        >
          <Text>Menu</Text>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SubmitReportModal");
          }}
          style={{ paddingRight: 20 }}
        >
          <Text>New Report</Text>
        </TouchableOpacity>
      )
    })
  },
  Detail: { screen: Detail }
});

export default UserReportsStackNavigator;
