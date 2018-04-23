import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { StackNavigator } from "react-navigation";
import firebase from "react-native-firebase";

class SubmitReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "" };
    this.submitReport = this.submitReport.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit() {
    this.submitReport();
    Keyboard.dismiss();
    this.props.navigation.navigate("Main");
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
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
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

const SubmitReportScreenStackNavigator = StackNavigator({
  SubmitReportScreen: { screen: SubmitReportScreen }
});

export default SubmitReportScreen;
