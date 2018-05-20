import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { toggleThank, getPublicReports } from "../api";

const Report = props => {
  console.log(props);
  //TODO: change the styling on the thank "button"
  const currKey = props.report.currKey;
  const currThankCount = props.report.thankCount;
  const currHasUserThanked = props.report.hasUserThanked;
  //TODO: still needs to reload the UI of updated thank count
  return (
    <View style={styles.container}>
      <Text>{props.report.title}</Text>
      <Text>{props.report.category}</Text>
      <Text>{props.report.description}</Text>
      <Text>{props.report.thankCount}</Text>
      <TouchableOpacity 
        onPress={thank.bind(this, currKey, currThankCount, currHasUserThanked)}
        color="#841584"
        title="Thanks"
        style={styles.button}>
        <Text style={styles.buttonText}> Thanks! </Text>
      </TouchableOpacity>
    </View>
  );
};

const thank = (key, prevThankCount, prevHasUserThanked) => {
  toggleThank(key, prevThankCount, prevHasUserThanked);
  getPublicReports();
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 10
  },
  category: {},
  description: {},
  button: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: 'powderblue',
  },
  buttonText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  }
});

export default Report;
