import React, { Component } from "react";
import { StackNavigator, TabNavigator } from "react-navigation";
import { Alert, Text, View, StyleSheet, Image, TouchableHighlight, ListView } from "react-native";
import firebase from "react-native-firebase";
import CampusMap from "./CampusMap";


class PublicReportsFeed extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home reports',
    drawerIcon: () => (
      <Image
        source= {require('../components/images/home.png')}
        style={{width: 40, height: 40, resizeMode: 'stretch'}}
      />
    )
  }

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
      const items = [];
      snap.forEach((child) => {
        items.push({
          uid: child.val().uid,
          category: child.val().category,
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
    this.listenForItems(this.itemsRef);
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        underlayColor='#007E8C'
        onPress={()=>this.props.navigation.navigate('Detail',
          {description: rowData.description, category: rowData.category})}>
        <View>
          <View style={styles.row}>
            <Text style={styles.descriptionTitle}>{rowData.category}</Text>
            <Text style={styles.descriptionText}>{rowData.description}</Text>
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

const Detail = (props) => {
    return(
        <View>
          <Text style={styles.detailsTitle}> {props.navigation.state.params.category} </Text>
          <Text style={styles.detailsText}> {props.navigation.state.params.description} </Text>
        </View>
    );
}

const PublicTabNavigation = TabNavigator({
  Feed: { screen: PublicReportsFeed },
  CampusMap: { screen: CampusMap },
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#FFD200',
    swipeEnabled: false,
    activeBackgroundColor: '#1295D8',
    inactiveTintColor: '#007E8C',
    labelStyle: {
      fontSize: 16,
      padding: 1
    }
  }
});

const PublicReportsFeedStackNavigator = StackNavigator({
  PublicReportsFeed: {
    screen: PublicTabNavigation,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <Text
          onPress={() => navigation.navigate("DrawerOpen")}
          style={{ paddingLeft: 20 }}>
          Menu
        </Text>
      ),
      headerRight: (
        <Text
          onPress={() => navigation.navigate("SubmitReportModal")}
          style={{ paddingRight: 20 }}>
          New Report
        </Text>
      )
    })
  },
  Detail: {screen: Detail}
});

var styles = StyleSheet.create({
  appContainer:{
    backgroundColor:'#FFD200',
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
    flex: 3,
  },
  descriptionTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  detailsText: {
    fontSize: 20,
    color: 'black',
  },
  detailsTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
  }
});

export default PublicReportsFeedStackNavigator;
