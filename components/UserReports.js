import React, { Component } from "react";
import { StackNavigator, TabNavigator } from "react-navigation";
import {
  Alert,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  ListView
} from "react-native";
import firebase from "react-native-firebase";
import ReportList from "./ReportList";

class UserReports extends Component {
  static navigationOptions = {
    drawerLabel: "Own Reports",
    drawerIcon: () => (
      <Image
        source={require("../components/images/analytics.png")}
        style={{ width: 40, height: 40, resizeMode: "stretch" }}
      />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      publicReports: [],
      privateReports: []
    };
  }

  fetchReports() {
    const uid = firebase.auth().currentUser.uid;
    const userReportsPath = `/users/${uid}/reports`;
    const privateReportsRef = firebase
      .database()
      .ref(`${userReportsPath}/private`);
    const publicReportsRef = firebase
      .database()
      .ref(`${userReportsPath}/public`);
    privateReportsRef.once("value", snap => {
      console.log(snap);
    });
    publicReportsRef.once("value", snap => {});
  }

  listenForItems(privateRef, publicRef) {
    const items = [];
    privateRef
      .orderByChild("uid")
      .equalTo(firebase.auth().currentUser.uid)
      .on("value", snap => {
        snap.forEach(child => {
          items.push({
            uid: child.val().uid,
            category: child.val().category,
            description: child.val().description
          });
        });
      });

    publicRef
      .orderByChild("uid")
      .equalTo(firebase.auth().currentUser.uid)
      .on("value", snap => {
        snap.forEach(child => {
          items.push({
            uid: child.val().uid,
            category: child.val().category,
            description: child.val().description
          });
        });
        const result = items.reverse();
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(result)
        });
      });
  }

  componentDidMount() {
    this.fetchReports();
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        underlayColor="#FFF7D6"
        onPress={() =>
          this.props.navigation.navigate("Detail", {
            description: rowData.description,
            category: rowData.category
          })
        }
      >
        <View>
          <View style={styles.row}>
            <Text style={styles.descriptionTitle}>{rowData.category}</Text>
            <Text style={styles.descriptionText}>{rowData.description}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <Text>Private Reports</Text>
        <Text>Public Reports</Text>
      </View>
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

const UserReportsStackNavigator = StackNavigator({
  UserReports: {
    screen: UserReports,
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

var styles = StyleSheet.create({
  appContainer: {
    backgroundColor: "#D1D1D1",
    flex: 1
  },
  row: {
    flexDirection: "row",
    padding: 12,
    height: 55
  },
  separator: {
    height: 0.5,
    backgroundColor: "#FFFF52"
  },
  descriptionText: {
    fontSize: 21,
    fontFamily: "normal",
    color: "#494949",
    flex: 2
  },
  descriptionTitle: {
    fontSize: 23,
    fontFamily: "monospace",
    color: "#494949",
    flex: 1,
    fontWeight: "500"
  },
  detailsText: {
    fontFamily: "serif",
    fontSize: 30,
    color: "#0067a6"
  },
  detailsTitle: {
    fontSize: 26,
    fontFamily: "monospace",
    fontWeight: "bold",
    color: "#0067a6"
  }
});

export default UserReportsStackNavigator;
