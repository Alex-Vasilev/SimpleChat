import { createStackNavigator, } from 'react-navigation';

import * as ROUTES from '../../constants/routes';

import * as COLORS from '../../constants/colors';

import Loading from '../loading';
import Login from '../login';
import Chat from '../chat';
import Users from '../users';
import Conversations from '../conversations';



const AppNavigator = createStackNavigator(
    {
        [ROUTES.LOADING]: Loading,
        [ROUTES.LOGIN]: Login,
        [ROUTES.CHAT]: Chat,
        [ROUTES.USERS]: Users,
        [ROUTES.CONVERSATIONS]: Conversations
    },
    {
        cardStyle: {
            backgroundColor: COLORS.WHITE,
        },
        headerMode: 'screen',
        navigationOptions: {
            headerStyle: {
                backgroundColor: COLORS.WHITE,
            },
            headerTitleStyle: {
                marginHorizontal: 'auto',
                fontFamily: 'Open Sans',
                fontSize: 17,
            },
        },
    }
);

export default AppNavigator;
