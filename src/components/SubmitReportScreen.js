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
import { submitReport } from "../api";

class SubmitReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "Theft",
      longitude: null,
      latitude: null,
      description: "",
      isPublic: false
    };
  }

  static navigationOptions = {
    drawerLabel: "Submit a Report"
  };

  // TODO: we might want to wait until a report is submitted to get the location
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  handleSubmit = () => {
    const { title, description } = this.state;
    if (title === null || description === null) {
      // TODO: provide user feedback
      return;
    }
    const report = {
      ...this.state
    };
    submitReport(report);
    Keyboard.dismiss();
    this.props.navigation.navigate("Main");
  };

  updateCategory = category => {
    this.setState({ category });
  };

  render() {
    // TODO: change the styling and color of the picker.item text and
    // pop up box for it
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Picker
          selectedValue={this.state.category}
          onValueChange={this.updateCategory}
          style={styles.picker}
        >
          <Picker.Item color="#494949" label="THEFT" value="Theft" />
          <Picker.Item color="#494949" label="ASSAULT" value="Assault" />
          <Picker.Item color="#494949" label="DOMESTIC" value="Domestic" />
          <Picker.Item color="#494949" label="WEAPON" value="Weapon" />
          <Picker.Item color="#494949" label="DRUGS" value="Drugs" />
        </Picker>

        <TextInput
          placeholder="Please enter a title for your report"
          onChangeText={title => this.setState({ title })}
        />

        <TextInput
          multiline
          style={styles.descriptionInput}
          placeholder="Please describe your incident's detail right here..."
          onChangeText={description => this.setState({ description })}
        />
        <Text>Make report public</Text>
        <Switch
          value={this.state.isPublic}
          onValueChange={value => this.setState({ isPublic: value })}
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
    backgroundColor: "#D1D1D1"
  },
  descriptionInput: {
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "#F2F2F2",
    borderColor: "#FFFF52",
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
    borderColor: "#FFFF52",
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