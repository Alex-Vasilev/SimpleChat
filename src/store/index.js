import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import {
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import app from './app';
import auth from './auth';
import navigation from './navigation';
import user from './user';
import users from './users';
import messages from './messages';


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
