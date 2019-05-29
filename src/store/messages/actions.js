import { createAction } from 'redux-actions';

import { SET_MESSAGES, SET_NEW_MESSAGE } from './types';


const setMessagesAction = createAction(SET_MESSAGES);
const setNewMessageAction = createAction(SET_NEW_MESSAGE);


export function setMessages(messages) {
    return function (dispatch) {
        return dispatch(setMessagesAction(messages.reverse()))
    };
}

export function setMessage(message) {
    return function (dispatch) {
        return dispatch(setNewMessageAction(message))
    };
}
