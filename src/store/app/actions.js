import * as ROUTES from '../../constants/routes';
import { reset } from '../../store/navigation/actions';


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

