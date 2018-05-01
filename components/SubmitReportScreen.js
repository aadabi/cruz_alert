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
    this.state = { longitude: "", latutude: "" , description: "", public: false };
    this.submitReport = this.submitReport.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = {
    drawerLabel: "Submit a Report"
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
       },
       (error) => Alert.alert(error.message),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  submitReport() {
    const description = this.state.description;
    if (description == null) {
      console.log("no input from report");
      return;
    }
    // TODO: get the time from the server
    const timestamp = new Date();
    const longitude = this.state.longitude;
    const latitude = this.state.latitude;
    const displayName = firebase.auth().currentUser.displayName;
    const email = firebase.auth().currentUser.email;
    const uid = firebase.auth().currentUser.uid;
    const subfield = this.state.public ? "public" : "private";
    const reportRef = firebase
      .database()
      .ref(`/reports/${subfield}/`)
      .push({ uid, displayName, email, description, timestamp, longitude, latitude });
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
          placeholder="Enter a description for your report here..."
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
