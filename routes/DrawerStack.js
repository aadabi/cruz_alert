import { DrawerNavigator } from "react-navigation";
import LogoutScreen from "../components/LogoutScreen";
import SubmitReportScreen from "../components/SubmitReportScreen";

const DrawerStack = DrawerNavigator({
  LogoutScreen: { screen: LogoutScreen },
  SubmitReportScreen: { screen: SubmitReportScreen }
});

export default DrawerStack;
