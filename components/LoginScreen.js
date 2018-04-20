import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';

export default class LoginScreen extends Component {
  constructor(props) {
      super(props);
      this.googleLogin = this.googleLogin.bind(this);
  }

  async googleLogin() {
      try {
          this.setState({loading: true});
          await GoogleSignin.configure();
          const data = await GoogleSignin.signIn();
          const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
          const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
          this.setState({loading: false});
          this.props.navigation.navigate('DrawerStack');
          console.info(JSON.stringify(currentUser.user.toJSON()));
      } catch (e) {
          console.error(e);
      }
  }

  render() {
      return (
        <View style ={loginStyle.container}>
          <Image resizeMode="contain" style={loginStyle.logo} source= {require('../components/images/rslogo.png')} />
          <View style={loginStyle.loginContainer}>


              <Button
                  onPress={this.googleLogin}
                  title="Log in with Google"
                  color='#ffae42'/>

          </View>
       </View>
      );
  }
}
  const loginStyle = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent:'center',
        flex: 1,
        backgroundColor:'#062938'

    },
    loginContainer:{
        flex: 1,
        justifyContent:'flex-end',
        padding:10

    },
    logo:{
        position: 'absolute',
        width:400,
        height:150
    }

});
