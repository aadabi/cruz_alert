import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import firebase from "react-native-firebase";

export default class SubmitReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "" };
  }

  static navigationOptions = {
    drawerLabel: "Submit a Report"
  };

  submitReport() {
    // TODO: add the report to the list of reports for the user
    const description = this.state.description;
    if (description == null) {
      console.log("no input from report");
      return;
    }
    const timestamp = new Date();
    const userName = firebase.auth().currentUser.displayName;
    const userEmail = firebase.auth().currentUser.email;
    const uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("/textReport/")
      .push({ uid, userName, userEmail, description, timestamp });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          multiline
          style={styles.descriptionInput}
          placeholder="Enter a description for your report here..."
          onChangeText={description => this.setState({ description })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.submitReport.bind(this)}
        >
          <Text style={styles.buttonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50
  },
  descriptionInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    height: "40%",
    padding: 10,
    paddingTop: 10,
    marginBottom: 10,
    textAlignVertical: "top"
  },
  button: {
    borderRadius: 10,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#4B966A"
  },
  buttonText: {
    color: "white"
  }
});
