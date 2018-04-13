import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
// import firebase from 'react-native-firebase';
// import { GoogleSignin } from 'react-native-google-signin';


// import {
//    FIREBASE_API_KEY,
//    AUTH_DOMAIN,
//    DATABASE_URL,
//    FIREBASE_PROJECT_ID,
//    FIREBASE_STORAGE_BUCKET,
//    MESSAGE_ID
// } from 'react-native-dotenv';


export default class SectionListBasics extends Component {
  constructor(props) {
    super(props);
    this.state = {description: ''};
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          multiline
          style={styles.descriptionInput}
          placeholder="Enter a description for your alert here..."
          onChangeText={(description) => this.setState({description})}
        />
      </View>
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
    borderColor: 'lightgray',
    height: '40%',
    padding: 10,
    paddingTop: 10
  }
});
