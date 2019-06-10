import { createAction } from 'redux-actions';
import { newChat } from '../../api/chat';
import * as ROUTES from '../../constants/routes';
// import { setMessages } from '../messages/actions';
import { navigate } from '../navigation/actions';
import { SET_CHAT, SET_CHATS, UPDATE_CHAT } from './types';


const setChatAction = createAction(SET_CHAT);
const setChatsAction = createAction(SET_CHATS);
const updateChatAction = createAction(UPDATE_CHAT);


export const setChat = chat => (dispatch) => {
  dispatch(setChatAction(chat));
  // dispatch(setMessages(chat.messages));
  dispatch(navigate(ROUTES.CHAT));
};

export const setChats = chats => (dispatch) => {
  dispatch(setChatsAction(chats));
};

export const setCurrentChatById = id => (dispatch, getState) => {
  const currentChat = getState().chats.userChats.find(item => item._id === id);
  dispatch(setChat(currentChat));
};

export const chatCreate = recieverId => (dispatch, getState) => {
  const { _token } = getState().user;

  newChat(recieverId, _token)
    .then((chat) => {
      const { userChats } = getState().chats;
      const updatedChats = [...userChats, chat];
      dispatch(setChat(chat));
      dispatch(setChats(updatedChats));
    })
    .catch(() => {
      dispatch(setChat({}));
      dispatch(setChats([]));
    });
};

export const updateUserChat = message => (dispatch, getState) => {
  const currentChatId = getState().chats.currentChat._id;
  dispatch(updateChatAction({ currentChatId, message }));
};
