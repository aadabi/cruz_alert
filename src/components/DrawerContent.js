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
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
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
  container: {
    height: "100%",
    display: "flex",
    backgroundColor:'white',
    justifyContent: "space-between"
  },
  logout: {
    textAlign: "center",
    padding: 20
  }
});
