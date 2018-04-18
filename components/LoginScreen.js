import React, { Component } from 'react';
import { View, Button } from 'react-native';
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
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Button 
                  onPress={this.googleLogin}
                  title="Log in with Google"
                  color="#841584"
              />
          </View>
      );
  }
}