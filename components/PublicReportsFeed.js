import React, { Component } from "react";
import { StackNavigator, TabNavigator } from "react-navigation";
import { Alert, Text, View, StyleSheet, Image, TouchableOpacity, TouchableHighlight, ListView } from "react-native";
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
      thankCount: 0,
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2}),
    });
    this.items = [];
  }

  listenForItems(itemsRef) {
    itemsRef.limitToLast(15).on('value', (snap) => {
      const items = [];
      snap.forEach((child) => {
        items.push({
          key: child.key,
          uid: child.val().uid,
          category: child.val().category,
          description: child.val().description
        });
      });
      const result = items.reverse();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(result)
      });
    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  incrementThank (){
    this.setState({ thankCount: ++this.state.thankCount});
  }

  decrementThank () {
    this.setState({thankCount: --this.state.thankCount});
  }

  onPressThank(value) {
    //Alert.alert(this.state.dataSource._dataBlob.s1[0].key);
    //const reportId = this.state.dataSource._dataBlob.s1[0].key;
    const reportId = value;

    // see if report has any users that thanked it
    firebase.database().ref(`/thanks/${reportId}/`).orderByChild('usersThanked').once('value', snap => {
      // check if report is thanked
      if (snap.val() == null) {
        this.incrementThank();
        const currUid = firebase.auth().currentUser.uid;
        const currThankCount = this.state.thankCount;
        const usersThanked = [];
        usersThanked.push(currUid);
        firebase.database().ref(`/thanks/${reportId}`).set({currThankCount, usersThanked});
        this.decrementThank();
      } else {
        const res = [];
        snap.forEach((child) => {
          res.push({
            user: child.val(),
          });
        });
        for (var i in res[1].user) {
          // check if user already thanked report
          if (res[1].user[i] != currUid) {
            this.incrementThank();
            const currUid = firebase.auth().currentUser.uid;
            const currThankCount = this.state.thankCount;
            const usersThanked = [];
            usersThanked.push(currUid);
            firebase.database().ref(`/thanks/${reportId}`).set({currThankCount, usersThanked});
            this.decrementThank();
          }
        }
      }
    });

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
            <Text style={styles.descriptionText}>{rowData.description}</Text>
            <TouchableOpacity
              onPress={this.onPressThank.bind(this, rowData.key)}
              color="#841584"
              title="Thanks"
              style={styles.button}>
                <Text style={styles.buttonText}> Thanks! </Text>
              </TouchableOpacity>
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

const PublicReportsFeedStackNavigator = StackNavigator({
  PublicReportsFeed: {
    screen: PublicTabNavigation,
    navigationOptions: ({ navigation }) => ({
      backgroundColor: '#FFFF52',
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
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: 'powderblue',
  },
  buttonText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  }
});

export default PublicReportsFeedStackNavigator;
