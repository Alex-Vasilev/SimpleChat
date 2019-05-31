import * as API from '../constants/api';
import api from './index';

export const getChats = (userId, token) => {
  return api.fetch(API.CHATS, token, {
    method: 'POST',
    data: {
      userId
    },
  });
}

export const newChat = (userId, recieverId, token) => {
  return api.fetch(API.NEW_CHAT, token, {
    method: 'POST',
    data: {
      userId,
      recieverId
    },
  });
}