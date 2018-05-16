import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Report = props => {
  console.log(props);
  return (
    <View style={styles.container}>
      <Text>{props.report.category}</Text>
      <Text>{props.report.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 10
  },
  category: {},
  description: {}
});

export default Report;
