import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView, StyleSheet, Text, View} from 'react-native';


export default class Side extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Login')}>
              Login
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Report')}>
                Report
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

Side.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create ({
  container: {
    paddingTop: 20,
    flex: 1
  },
  navItemStyle: {
    padding: 10
  },
  navSectionStyle: {
    backgroundColor: 'white'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  }
});
