import { createAction } from 'redux-actions';

import { SET_MESSAGES, SET_NEW_MESSAGE } from './types';


const setMessagesAction = createAction(SET_MESSAGES);
const setNewMessageAction = createAction(SET_NEW_MESSAGE);


export const setMessages = messages => dispatch => {
    return dispatch(setMessagesAction(messages.reverse()))
}

export const setMessage = message => dispatch => {
    return dispatch(setNewMessageAction(message))
}
