import { AppState } from 'react-native';
import { createAction } from 'redux-actions';
import * as ROUTES from '../../constants/routes';
import { reset } from '../navigation/actions';
import { initAuth } from '../auth/actions';
import { APP_STATE_CHANGE, SET_PENDING } from './types';

const appStateChangeAction = createAction(APP_STATE_CHANGE);
const setPendingAction = createAction(SET_PENDING);


export const appStateChange = state => (dispatch) => {
  dispatch(appStateChangeAction(state));
};

export const setPending = bool => (dispatch) => {
  dispatch(setPendingAction(bool));
};

const runApp = () => (dispatch, getState) => {
  const { user } = getState();

  if (Object.keys(user).length) {
    dispatch(initAuth());
  } else {
    dispatch(reset(ROUTES.LOGIN));
  }
};

export const initApplication = () => (dispatch) => {
  dispatch(appStateChange(AppState.currentState));
  AppState.addEventListener('change', nextAppState => dispatch(appStateChange(nextAppState)));

  dispatch(runApp());
};
