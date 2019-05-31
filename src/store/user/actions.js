import { createAction } from 'redux-actions';
import { SET_USER, REMOVE_USER } from './types';


const setUserAction = createAction(SET_USER);
const removeUserAction = createAction(REMOVE_USER);


export const setUserInfo = (user) => (dispatch) => {
    dispatch(setUserAction(user))
}

export const removeUserInfo = () => (dispatch) => {
    dispatch(removeUserAction())
}