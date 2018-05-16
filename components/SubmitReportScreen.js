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
  KeyboardAvoidingView,
  Picker
} from "react-native";
import { StackNavigator } from "react-navigation";
import firebase from "react-native-firebase";

class SubmitReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { category: "Theft", longitude: "", latutude: "" , description: "", public: false };
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
    const category = this.state.category;
    const longitude = this.state.longitude;
    const latitude = this.state.latitude;
    const displayName = firebase.auth().currentUser.displayName;
    const email = firebase.auth().currentUser.email;
    const uid = firebase.auth().currentUser.uid;
    const subfield = this.state.public ? "public" : "private";
    const reportRef = firebase
      .database()
      .ref(`/reports/${subfield}/`)
      .push({ uid, displayName, email, category, description, timestamp, longitude, latitude });
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

  updateCategory = (cat) => {
    this.setState({ category: cat })
  }

  render() {
    // TODO: change the styling and color of the picker.item text and
    // pop up box for it
    return (
      <KeyboardAvoidingView style={styles.container}>

        <Picker
          selectedValue = {this.state.category}
          onValueChange = {this.updateCategory}
          style= {styles.picker}>
          <Picker.Item color="#494949" label = "THEFT" value = "Theft"/>
          <Picker.Item color="#494949" label = "ASSAULT" value = "Assault"/>
          <Picker.Item color="#494949" label = "DOMESTIC" value ="Domestic"/>
          <Picker.Item color="#494949" label = "WEAPON" value = "Weapon"/>
          <Picker.Item color="#494949" label = "DRUGS" value = "Drugs"/>
        </Picker>

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
          <Text style={styles.buttonText}>SUBMIT REPORT</Text>
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
    backgroundColor: "#D1D1D1",
  },
  descriptionInput: {
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "#F2F2F2",
    borderColor: '#FFFF52',
    borderWidth: 2,
    height: "60%",
    padding: 5,
    paddingTop: 5,
    marginBottom: 20,
    textAlignVertical: "top"
  },
  button: {
    borderRadius: 23,
    alignItems: "center",
    borderColor: '#FFFF52',
    borderWidth: 1,
    padding: 20,
    backgroundColor: "#8C8C8C"
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18
  },
  picker: {
    height: 50,
    width: 150
  }
});

const SubmitReportScreenStackNavigator = StackNavigator({
  SubmitReportScreen: { screen: SubmitReportScreen }
});

export default SubmitReportScreen;
