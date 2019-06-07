import { AppState } from 'react-native';
import { createAction } from 'redux-actions';
import * as ROUTES from '../../constants/routes';
import { reset } from '../../store/navigation/actions';
import { initAuth } from '../auth/actions';
import { APP_STATE_CHANGE } from './types';

const appStateChangeAction = createAction(APP_STATE_CHANGE);

export const appStateChange = (state) => (dispatch) => {
  dispatch(appStateChangeAction(state));
}

const runApp = () => (dispatch, getState) => {
  const { user } = getState()

  if (Object.keys(user).length) {
    dispatch(initAuth());
  } else {
    dispatch(reset(ROUTES.LOGIN));
  }
};

export const initApplication = () => (dispatch, getState) => {
  dispatch(appStateChange(AppState.currentState));
  AppState.addEventListener('change', nextAppState =>
    dispatch(appStateChange(nextAppState))
  );

  dispatch(runApp());
}
