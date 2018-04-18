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

  submitReport() {
    // submit this.state.description to firebase backend
    // possible feature: check if report is empty or very short and
    // TODO: keep track of user id
    const description = this.state.description;
    if (description == null) {
      console.log("no input from report");
      return;
    }
    console.log(description);
    firebase
      .database()
      .ref("/textReport")
      .set({ description });
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
    marginBottom: 10
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
