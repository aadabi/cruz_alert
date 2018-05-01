import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { Alert, Text, View, StyleSheet, TouchableHighlight, ListView } from "react-native";
import firebase from "react-native-firebase";

class UserReports extends Component {
  static navigationOptions = {
    drawerLabel: "Your Reports"
  };

  constructor(props) {
    super(props);
    this.privateRef = firebase.database().ref('/reports/private');
    this.publicRef = firebase.database().ref('/reports/public');
    this.state = ({
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2})
    });
    this.items = [];
  }

  listenForItems(privateRef, publicRef) {
    const items = [];
    privateRef.orderByChild('uid').equalTo(firebase.auth().currentUser.uid).on('value', (snap) => {
      snap.forEach((child) => {
        items.push({
          description: child.val().description
        });
      });
    });

    publicRef.orderByChild('uid').equalTo(firebase.auth().currentUser.uid).on('value', (snap) => {
      snap.forEach((child) => {
        items.push({
          description: child.val().description
        });
      });
      const result = items.reverse()
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(result)
      });
    });
  }

  componentDidMount() {
    this.listenForItems(this.privateRef, this.publicRef);
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        underlayColor='#dddddd'>
        <View>
          <View style={styles.row}>
            <Text style={styles.descriptionText}>{rowData.description }</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }


  render() {
    return (
      <View style={styles.appContainer}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        enableEmptySection={true}
        style={{flex:1}} />
    </View>
    );
  }
}

const UserReportsStackNavigator = StackNavigator({
  UserReports: {
    screen: UserReports,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <Text
          onPress={() => navigation.navigate("DrawerOpen")}
          style={{ paddingLeft: 20 }}
        >
          Menu
        </Text>
      ),
      headerRight: (
        <Text
          onPress={() => navigation.navigate("SubmitReportModal")}
          style={{ paddingRight: 20 }}
        >
          New Report
        </Text>
      )
    })
  }
});

var styles = StyleSheet.create({
  appContainer:{
    flex: 1
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 44
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  descriptionText: {
    flex: 1,
  }
});

export default UserReportsStackNavigator;
