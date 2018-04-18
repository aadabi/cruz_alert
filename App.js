import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { StackNavigator, DrawerNavigator, SwitchNavigator } from 'react-navigation';

class LoadingScreen extends Component {
    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('DrawerStack');
            } else {
                this.props.navigation.navigate('LoginScreen');
            }
        });
    }

    componentWillUnmount() {
        this.authSubscription();
    }
  
    render() {
        return <Text>Loading</Text>
    }
}

class LoginScreen extends Component {
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

class Screen1 extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    
    async logout() {
        try {
            await firebase.auth().signOut();
            this.props.navigation.navigate('LoginScreen');
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <Button
                onPress={this.logout}
                title="Log out"
                color="red"
            />
        );
    }
}

const DrawerStack = DrawerNavigator({
    screen1: { screen: Screen1 }
});

const DrawerNavigation = StackNavigator({
    DrawerStack: { screen: DrawerStack }
}, {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
        headerStyle: {backgroundColor: '#4C3E54'},
        title: 'Welcome!',
        headerTintColor: 'white',
    })
});

const RootStack = SwitchNavigator(
    {
        LoginScreen: {screen: LoginScreen},
        DrawerStack: {screen: DrawerNavigation},
        LoadingScreen: {screen: LoadingScreen}
    },
    {
        initialRouteName: 'LoadingScreen'
    }
);

export default class App extends Component {
    render() {
        return <RootStack />
    }
}