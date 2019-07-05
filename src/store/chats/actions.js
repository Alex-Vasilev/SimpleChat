import { createAction } from 'redux-actions';
import { newChat, addUser } from '../../api/chat';
import { generateKeypair } from '../../utils/crypt';
import { setPending } from '../app/actions';
import { setPrivateKey, setPublicKey } from '../messages/actions';
import { getCurrentChat, getDestinationKeys } from '../socket';
import { SET_CHAT, SET_CHATS, UPDATE_CHAT } from './types';
import { navigate } from '../navigation/actions';
import * as ROUTES from '../../constants/routes';


const setChatAction = createAction(SET_CHAT);
const setChatsAction = createAction(SET_CHATS);
const updateChatAction = createAction(UPDATE_CHAT);

export const setChat = chat => (dispatch) => {
  dispatch(setChatAction(chat));
};

export const setChats = chats => (dispatch) => {
  dispatch(setChatsAction(chats));
};

export const setCurrentChatById = id => (dispatch, getState) => {
  const currentChat = getState().chats.userChats.find(item => item._id === id);
  const { _id } = getState().user;
  dispatch(setPending(true));
  if (currentChat.userKeys[_id]) {
    getCurrentChat(currentChat._id);
  } else {
    Promise.resolve(generateKeypair())
      .then((keys) => {
        dispatch(setPublicKey(currentChat._id, keys.publicKey));
        dispatch(setPrivateKey(currentChat._id, keys.privateKey));
        getDestinationKeys(currentChat._id, keys.publicKey);
      });
  }
};

export const chatCreate = recieverId => (dispatch, getState) => {
  const { _token } = getState().user;
  dispatch(setPending(true));

  newChat(recieverId, _token)
    .then((chat) => {
      Promise.resolve(generateKeypair())
        .then((keys) => {
          dispatch(setPublicKey(chat._id, keys.publicKey));
          dispatch(setPrivateKey(chat._id, keys.privateKey));
          getDestinationKeys(chat._id, keys.publicKey);
        });
    })
    .catch(() => {
      dispatch(setChat({}));
      dispatch(setChats([]));
    });
};

export const updateUserChat = message => (dispatch) => {
  dispatch(updateChatAction(message));
};

export const navigateToAddUserToChat = chatId => (dispatch) => {
  dispatch(navigate(ROUTES.USERS, { chatId, addindUser: true }));
};

export const addUserToChat = (recieverId, chatId) => (dispatch, getState) => {
  const { _token } = getState().user;
  addUser(recieverId, chatId, _token)
    .then(() => {
      dispatch(navigate(ROUTES.CHAT));
    })
    .catch(() => console.log('err'));
};
