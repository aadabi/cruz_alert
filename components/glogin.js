import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {user:null};
  }

  componentDidMount() {
    this._setupGoogleSignin();
  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        webClientId: '764779446389-73hvh10d930ickmsor2p8jt65df4136q.apps.googleusercontent.com',
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({user});
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

    _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.setState({user: user});
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({user: null});
    })
    .done();
  }

  render() {

    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <GoogleSigninButton style={{width: 120, height: 44}}
            color={GoogleSigninButton.Color.Light}
            size={GoogleSigninButton.Size.Icon}
            onPress={() => { this._signIn(); }}/>
        </View>
      );
    }

    if (this.state.user) {
      return (
        <View style={styles.container}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 20}}>
            Welcome {this.state.user.name}</Text>
          <Text>Your email is: {this.state.user.email}</Text>

          <TouchableOpacity onPress={() => {this._signOut(); }}>
            <View style={{marginTop: 50}}>
              <Text>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
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
    paddingTop: 10,
    marginBottom: 10
  },
  button: {
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4B966A'
  },
  buttonText: {
    color: 'white'
  }
});
