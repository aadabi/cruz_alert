import { DrawerNavigator } from 'react-navigation';
import LogoutScreen from '../components/LogoutScreen';

const DrawerStack = DrawerNavigator({
  LogoutScreen: { screen: LogoutScreen }
});

export default DrawerStack