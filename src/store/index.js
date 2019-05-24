import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import {
  createReactNavigationReduxMiddleware,
  // createNavigationReducer,
} from 'react-navigation-redux-helpers';

import app from './app';
import auth from './auth';
import navigation from './navigation';
import user from './user';
import users from './users';
import messages from './messages';
// import AppNavigator from '../screens/navigator'

import socket from './socket';



socket.on('priorMessages', messages => {
  dispatch => {
    dispatch(gotMessages(messages));
  }
});

socket.on('userCreated', response => {
  const { user, users } = response;
  store.dispatch(gotUser(user));
  store.dispatch(gotUsers(users));
  navigate('Users');
});

socket.on('newUser', user => {
  store.dispatch(gotNewUser(user));
});

socket.on('incomingMessage', message => {
  store.dispatch(gotNewMessage(message));
});

// export const login = (credentials, navigation) => {
//   socket.emit('newUser', credentials);
//   navigate = navigation.navigate;
// };

// export const openChat = users => {
//   socket.emit('chat', users);
// };

// export const sendMessage = (text, sender, receiver) => {
//   socket.emit('message', { text, sender, receiver });
// };

export default function configureStore() {

  const navigationMiddleware = createReactNavigationReduxMiddleware(
    state => state.nav,
  );

  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const rootReducer = combineReducers({
    app,
    navigation,
    auth,
    messages,
    user,
    users,
  });

  const store = createStore(
    rootReducer,
    {},
    composeEnhancers(applyMiddleware(navigationMiddleware, thunk)),
  );

  return store;
}
