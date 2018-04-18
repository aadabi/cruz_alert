import { StackNavigator } from "react-navigation";
import DrawerStack from "./DrawerStack";

const MainNavigation = StackNavigator(
  {
    DrawerStack: { screen: DrawerStack }
  },
  {
    headerMode: "float",
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: "#4C3E54" },
      title: "Welcome!",
      headerTintColor: "white"
    })
  }
);

export default MainNavigation;
