import { createAction } from 'redux-actions';
import { newChat } from '../../api/chat';
import * as ROUTES from '../../constants/routes';
import { navigate } from '../navigation/actions';
import { getMessages } from '../socket';
import { SET_CHAT, SET_CHATS } from './types';


const setChatAction = createAction(SET_CHAT);
const setChatsAction = createAction(SET_CHATS);

export const setChat = chat => dispatch => {
    dispatch(setChatAction(chat))
    getMessages(chat._id)
    dispatch(navigate(ROUTES.CHAT))
}

export const setChats = chats => dispatch => {
    dispatch(setChatsAction(chats))
}

export const chatCreate = recieverId => (dispatch, getState) => {
    const userId = getState()
    newChat(userId, recieverId)
        .then(chat => {
            dispatch(setChat(chat))
        })
}