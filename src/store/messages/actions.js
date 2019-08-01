import { createAction } from 'redux-actions';
import {
  SET_MESSAGES,
  SET_NEW_MESSAGE,
  SET_PUBLIC_KEY,
  SET_DESTINATION_KEY,
  SET_PRIVATE_KEY,
} from './types';


const setMessagesAction = createAction(SET_MESSAGES);
const setNewMessageAction = createAction(SET_NEW_MESSAGE);
const setKeyPublicAction = createAction(SET_PUBLIC_KEY);
const setKeyPrivateAction = createAction(SET_PRIVATE_KEY);

const setDestinationKeyAction = createAction(SET_DESTINATION_KEY);

export const setMessages = messages => (dispatch) => {
  dispatch(setMessagesAction(messages));
};

export const setMessage = message => (dispatch) => {
  dispatch(setNewMessageAction(message));
};

export const setPublicKey = (chatId, key) => (dispatch, getState) => {
  const { _id } = getState().user;
  dispatch(setKeyPublicAction({ chatId, key, _id }));
};

export const setPrivateKey = (chatId, key) => (dispatch, getState) => {
  const { _id } = getState().user;
  dispatch(setKeyPrivateAction({ chatId, key, _id }));
};

export const setDestinationPublicKey = (chatId, key) => (dispatch, getState) => {
  const { _id } = getState().user;
  dispatch(setDestinationKeyAction({ chatId, key, _id }));
};
