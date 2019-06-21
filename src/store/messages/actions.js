import { createAction } from 'redux-actions';
// import { Thread } from 'react-native-threads';
import { SET_MESSAGES, SET_NEW_MESSAGE } from './types';

// const thread = new Thread('crypto-worker.js');

const setMessagesAction = createAction(SET_MESSAGES);
const setNewMessageAction = createAction(SET_NEW_MESSAGE);


export const setMessages = messages => (dispatch) => {
  dispatch(setMessagesAction(messages));
};

export const setMessage = message => (dispatch) => {
  dispatch(setNewMessageAction(message));

  // getWebWorkerResponse(null, message)
};

export const getWebWorkerResponse = () => () => {
  // thread.postMessage(messagePayload);
};
