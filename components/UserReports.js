import React, { Component } from "react";
import { StackNavigator, TabNavigator } from "react-navigation";
import { Alert, Text, View, Image, StyleSheet, TouchableHighlight, ListView } from "react-native";
import firebase from "react-native-firebase";
import CampusMap from "./CampusMap";


class UserReports extends Component {
  static navigationOptions = {
    drawerLabel: 'Own Reports',
    drawerIcon: () => (
      <Image
        source= {require('../components/images/analytics.png')}
        style={{width: 40, height: 40, resizeMode: 'stretch'}}
      />
    )
  }

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
          uid: child.val().uid,
          category: child.val().category,
          description: child.val().description
        });
      });
    });

    publicRef.orderByChild('uid').equalTo(firebase.auth().currentUser.uid).on('value', (snap) => {
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
    this.listenForItems(this.privateRef, this.publicRef);
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        underlayColor='#FFF7D6'
        onPress={()=>this.props.navigation.navigate('Detail',
          {description: rowData.description, category: rowData.category})}>
        <View>
          <View style={styles.row}>
            <Text style={styles.descriptionTitle}>{rowData.category}</Text>
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

const Detail = (props) => {
    return(
        <View>
          <Text style={styles.detailsTitle}> {props.navigation.state.params.category} </Text>
          <Text style={styles.detailsText}> {props.navigation.state.params.description} </Text>
        </View>
    );
}

const UserTabNavigation = TabNavigator({
  Feed: { screen: UserReports },
  CampusMap: { screen: CampusMap },
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#FFFF52',
    swipeEnabled: false,
    activeBackgroundColor: '#0067A6',
    inactiveTintColor: '#D1D1D1',
    labelStyle: {
      fontSize: 15,
      padding: 1
    }
  }
});

const UserReportsStackNavigator = StackNavigator({
  UserReports: {
    screen: UserTabNavigation,
    navigationOptions: ({ navigation }) => ({
      backgroundColor: '#FFFF52',
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
    backgroundColor:'#D1D1D1',
    flex: 1
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 55
  },
  separator: {
    height: 0.5,
    backgroundColor: '#FFFF52',
  },
  descriptionText: {
    fontSize: 21,
    fontFamily: "normal",
    color: '#494949',
    flex: 2
  },
  descriptionTitle: {
    fontSize: 23,
    fontFamily: "monospace",
    color: '#494949',
    flex: 1,
    fontWeight: '500',
  },
  detailsText: {
    fontFamily: "serif",
    fontSize: 30,
    color: '#0067a6'
  },
  detailsTitle: {
    fontSize: 26,
    fontFamily: "monospace",
    fontWeight: 'bold',
    color: '#0067a6'
  }
});

export default UserReportsStackNavigator;
