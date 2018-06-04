import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { DrawerItems } from "react-navigation";
import firebase from "react-native-firebase";

export default class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  async logout() {
    try {
      await firebase.auth().signOut();
      this.props.navigation.navigate("LoginScreen");
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const firstname = firebase.auth().currentUser.displayName.split(' ')[0];
    const lastname = firebase.auth().currentUser.displayName.split(' ')[1];
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
          <View style={styles.header}>
            <View style={styles.userName}>
              <Text style={styles.userName}>  {firstname} </Text>
              <Text style={styles.userName}>  {lastname} </Text>
            </View>
          </View>
          <View style={styles.container}>
            <DrawerItems {...this.props} />
            <TouchableOpacity onPress={this.logout}>
              <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 130,
    display: "flex",
    backgroundColor:'#D1D1D1',

  },
  userName: {
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
    fontSize: 40,
    color: 'black',
  },
  nameContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  container: {
    height: "78%",
    display: "flex",
    backgroundColor:'#e8e8e8',
    justifyContent: "space-between"
  },
  logout: {
    textAlign: "center",
    padding: 20
  }
});
