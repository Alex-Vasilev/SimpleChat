import { createAction } from 'redux-actions';
import { newChat } from '../../api/chat';
import * as ROUTES from '../../constants/routes';
import { navigate } from '../navigation/actions';
import { SET_CHAT, SET_CHATS } from './types';
import { getMessages } from '../socket'


const setChatAction = createAction(SET_CHAT);
const setChatsAction = createAction(SET_CHATS);

export function chatCreate(recieverId) {
    return function (dispatch, getState) {
        const userId = getState()
        newChat(userId, recieverId)
            .then(chat => {
                dispatch(setChat(chat))
            })
    }
}

export function setChat(chat) {
    return function (dispatch) {
        dispatch(setChatAction(chat))
        getMessages(chat._id)
        dispatch(navigate(ROUTES.CHAT))
    }
}

export function setChats(chats) {
    return function (dispatch) {
        dispatch(setChatsAction(chats))
    }
}