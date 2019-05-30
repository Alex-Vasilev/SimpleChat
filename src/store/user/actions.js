import { createAction } from 'redux-actions';
import { SET_USER } from './types';


const setUserAction = createAction(SET_USER);


export const setUserInfo = user => dispatch => {
    dispatch(setUserAction(user))
}
