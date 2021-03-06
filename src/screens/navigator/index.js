import { createStackNavigator } from 'react-navigation';
import * as ROUTES from '../../constants/routes';
import Chat from '../chat';
import Chats from '../chats';
import Loading from '../loading';
import Login from '../login';
import Users from '../users';
import Verify from '../verify';


const AppNavigator = createStackNavigator(
  {
    [ROUTES.LOADING]: Loading,
    [ROUTES.LOGIN]: Login,
    [ROUTES.CHAT]: Chat,
    [ROUTES.USERS]: Users,
    [ROUTES.CHATS]: Chats,
    [ROUTES.VERIFY]: Verify,
  },
  {
    headerMode: 'none',
  },
);

export default AppNavigator;
