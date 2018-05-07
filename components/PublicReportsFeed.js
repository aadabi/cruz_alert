import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { Alert, Text, View, StyleSheet, TouchableHighlight, ListView } from "react-native";
import firebase from "react-native-firebase";

class PublicReportsFeed extends Component {
  constructor(props) {
    super(props);
    this.itemsRef = firebase.database().ref('/reports/public');
    this.state = ({
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2})
    });
    this.items = [];
  }

  listenForItems(itemsRef) {
    itemsRef.limitToLast(15).on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          description: child.val().description
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        underlayColor='#007E8C'>
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

const PublicReportsFeedStackNavigator = StackNavigator({
  PublicReportsFeed: {
    screen: PublicReportsFeed,
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
    backgroundColor:'#FFB511',
    flex: 1
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 44
  },
  separator: {
    height: 1,
    backgroundColor: '#005581',
  },
  descriptionText: {
    flex: 1,
  }
});

export default PublicReportsFeedStackNavigator;
