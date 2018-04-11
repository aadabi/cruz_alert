import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View } from 'react-native';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';


import {
   FIREBASE_API_KEY,
   AUTH_DOMAIN,
   DATABASE_URL,
   FIREBASE_PROJECT_ID,
   FIREBASE_STORAGE_BUCKET,
   MESSAGE_ID
} from 'react-native-dotenv';


export default class SectionListBasics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
   alignItems: 'center'
  }
});
