import * as ROUTES from '../../constants/routes';

import { reset, navigate } from '../../store/navigation/actions';
import {initAuth} from '../../store/auth/actions'

export function initApplication() {
  return function (dispatch, getState) {
    dispatch(runApp());
  };
}

function runApp() {
  return function (dispatch) {
    dispatch(reset(ROUTES.LOGIN));
  }
};

