import { createAction } from 'redux-actions';
import { SET_USER } from './types';


const setUserAction = createAction(SET_USER);



export function setUserInfo(user) {
    return function (dispatch) {
        dispatch(setUserAction(user))
    };
}
