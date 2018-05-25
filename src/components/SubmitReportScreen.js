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
    if (title === null || description === null || title === "" || description === "") {
      Alert.alert("Please enter a title and description.")
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
        <TextInput
          underlineColorAndroid="#1295D8"
          selectionColor="#FFB511"
          placeholder="Please enter a title for your report"
          autoFocus={true}
          onChangeText={title => this.setState({ title })}
        />

        <TextInput
          multiline
          underlineColorAndroid="#1295D8"
          selectionColor="#FFB511"
          style={styles.descriptionInput}
          placeholder="Please describe your incident's detail right here..."
          onChangeText={description => this.setState({ description })}
        />

        <View
          style={styles.pickers}>
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
        <Picker
          selectedValue={this.state.isPublic}
          onValueChange={value => this.setState({ isPublic: value })}
          style={styles.picker}
        >
          <Picker.Item color="#494949" label="Private" value={false} />
          <Picker.Item color="#494949" label="Public" value={true} />
        </Picker>
        </View>

        <View style={styles.buttonBack}>
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>SUBMIT REPORT</Text>
        </TouchableOpacity>
        </View>
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
    borderColor: "#1295D8",
    borderWidth: 1,
    height: "45%",
    padding: 5,
    paddingTop: 5,
    marginBottom: 20,
    textAlignVertical: "top"
  },
  button: {
    borderRadius: 23,
    alignItems: "center",
    borderColor: "#000000",
    borderWidth: 1,
    padding: 20,
    backgroundColor: "#333333"
  },
  buttonBack: {
    flex: 1,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18
  },
  picker: {
    height: 50,
    width: 150,
  },
  pickers: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

const SubmitReportScreenStackNavigator = StackNavigator({
  SubmitReportScreen: { screen: SubmitReportScreen }
});

export default SubmitReportScreen;
