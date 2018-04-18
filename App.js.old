import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Button} from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

import Side from './routes/side'
import Login from './components/glogin';
import Report from './components/report';

const Root =  DrawerNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login"
    }
  },
  Report: {
    screen: Report,
    navigationOptions: {
      title: "Report"
    }
  }
}, {
  contentComponent: Side,
  drawerWidth: 300
});

export default Root;
