import React, { Component } from "react";
import {
  View,
  Button,
  Alert,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { GoogleSignin } from "react-native-google-signin";
import firebase from "react-native-firebase";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.googleLogin = this.googleLogin.bind(this);
  }

  async addUserToDatabase(user) {
    const { uid, displayName, email } = user;
    firebase
      .database()
      .ref("/users/" + uid)
      .set({
        displayName,
        email
      });
  }

  async googleLogin() {
    try {
      await GoogleSignin.configure({
        iosClientId:
          "764779446389-4nn97kusaue5slp3pbnar1folng5hvsa.apps.googleusercontent.com"
      });
      const data = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );
      const {
        user
      } = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      if (user.email.substr(user.email.length - 8) != "ucsc.edu") {
        Alert.alert("Please use your UCSC email to log in.");
        await GoogleSignin.signOut();
      } else {
        await this.addUserToDatabase(user);
        this.props.navigation.navigate("MainNavigation");
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <ImageBackground
        source={require('../components/images/background.png')}
        style={styles.ScreenCont}>
        <Image resizeMode="contain" style={styles.logo} source= {require('../components/images/Logoldpi.png')} />
        <View style={styles.ButtonContainer}>
          <View style ={styles.loginContainer} >
            <TouchableOpacity style={styles.GoogleDesign} activeOpacity={0.5} onPress={this.googleLogin}>
                <Image
                  source={require('../components/images/google-logo.png')}
                  style={styles.IconLayout}/>
                <View style={styles.ButtonDivider} />
                <Text style={styles.TextLayout}> Login with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  ScreenCont:{
       alignItems:'center',
       justifyContent:'center',
       flex: 1,
       backgroundColor:'transparent',
       width: undefined,
       height: undefined

   },
   loginContainer:{
       flex: 1,
       justifyContent:'flex-end',
       padding:10

   },
   logo:{
       position: 'absolute',
       borderWidth:.8,
       borderColor:'transparent',
       width:300,
       height:300,
       padding:5
   },

  ButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },

  GoogleDesign: {
   //specifies direction of flexible alignItems
   //so that text image are in a row
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: '#FFFF52',
   //color of the divider between image and text
   //also the border of the button
   borderColor: '#D1D1D1',
   borderWidth: 1,
   height: 50,
   //this makes button corners rounded
   borderRadius: 15 ,
   margin: 50,



 },

 TextLayout:{
   marginBottom : 4,
   marginRight :20,
   color: "#005581"


 },

 ButtonDivider :{
   width: 2,
   height: 50,
   backgroundColor : '#005581'


 },
 IconLayout: {
    padding: 10,
    margin: 5,
    height: 40,
    width: 40,
    resizeMode : 'stretch',

 }
 });
