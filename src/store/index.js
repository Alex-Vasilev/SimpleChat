import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import app from './app';
import auth from './auth';
import chats from './chats';
import messages from './messages';
import navigation from './navigation';
import user from './user';
import users from './users';




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
    chats
  });

  const store = createStore(
    rootReducer,
    {},
    composeEnhancers(applyMiddleware(navigationMiddleware, thunk)),
  );

  return store;
}
