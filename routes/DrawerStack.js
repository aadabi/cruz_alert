import React from "react";
import firebase from "react-native-firebase";
import { Text, View, SafeAreaView, Button } from "react-native";
import { DrawerNavigator, DrawerItems } from "react-navigation";
import SubmitReportScreen from "../components/SubmitReportScreen";


const DrawerStack = DrawerNavigator(
  {
    SubmitReportScreen: { screen: SubmitReportScreen }
  },
  {
    headerMode: "float",
    navigationOptions: ({ navigation }) => ({
      backgroundColor: '#005581',
      headerLeft: (
        <Text onPress={() => navigation.navigate("DrawerOpen")}>Menu</Text>
      )
    }),
    contentComponent: props => (
      // TODO: possibly move this to its own component
      <View style={{ flex: 1 }}>
        <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
          <DrawerItems {...props} />
          <Button
            title="Logout"
            onPress={async () => {
              try {
                await firebase.auth().signOut();
                props.navigation.navigate("LoginScreen");
              } catch (e) {
                console.error(e);
              }
            }}
          />
        </SafeAreaView>
      </View>
    )
  }
);

export default DrawerStack;
