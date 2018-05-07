import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Switch,
  KeyboardAvoidingView
} from "react-native";
import { StackNavigator } from "react-navigation";
import firebase from "react-native-firebase";

class SubmitReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", public: false };
    this.submitReport = this.submitReport.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = {
    drawerLabel: "Submit a Report"
  };

  submitReport() {
    const description = this.state.description;
    if (description == null) {
      console.log("no input from report");
      return;
    }
    // TODO: get the time from the server
    const timestamp = new Date();
    const displayName = firebase.auth().currentUser.displayName;
    const email = firebase.auth().currentUser.email;
    const uid = firebase.auth().currentUser.uid;
    const subfield = this.state.public ? "public" : "private";
    const reportRef = firebase
      .database()
      .ref(`/reports/${subfield}/`)
      .push({ uid, displayName, email, description, timestamp });
    firebase
      .database()
      .ref(`/users/${uid}/posts/${subfield}/${reportRef.key}`)
      .set(true);
  }

  handleSubmit() {
    this.submitReport();
    Keyboard.dismiss();
    this.props.navigation.navigate("Main");
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          multiline
          style={styles.descriptionInput}
          placeholder="Please describe your incident's detail right here..."
          onChangeText={description => this.setState({ description })}
        />
        <Text>Make report public</Text>
        <Switch
          value={this.state.public}
          onValueChange={value => this.setState({ public: value })}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Submit Report</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#007E8C",
  },
  descriptionInput: {
    borderRadius: 15,
    backgroundColor: "#FFB511",
    borderColor: '#005581',
    borderWidth: 2,
    height: "60%",
    padding: 5,
    paddingTop: 5,
    marginBottom: 20,
    textAlignVertical: "top"
  },
  button: {
    borderRadius: 15,
    alignItems: "center",
    borderColor: '#005581',
    borderWidth: 2,
    padding: 20,
    backgroundColor: "#FFB511"
  },
  buttonText: {
    color: "#005581"
  }
});

const SubmitReportScreenStackNavigator = StackNavigator({
  SubmitReportScreen: { screen: SubmitReportScreen }
});

export default SubmitReportScreen;
