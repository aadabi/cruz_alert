import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { Text, View, StyleSheet, } from "react-native";
import Menu from "../routes/DrawerStack";

class CampusMap extends Component {
  static navigatonOptions = {
    tabBarLabel: 'Campus Map',
  }
  render() {
    return (
      <View>
        <Text> empty campus map component </Text>
      </View>
    )
  }
}

export default CampusMap;
