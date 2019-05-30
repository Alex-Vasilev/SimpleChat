import * as API from '../constants/api';
import api from './index';

export const getChats = (userId) => {
  return api.fetch(API.CHATS, {
    method: 'POST',
    data: {
      userId
    },
  });
}

export function newChat(userId, recieverId) {
  return api.fetch(API.NEW_CHAT, {
    method: 'POST',
    data: {
      userId,
      recieverId
    },
  });
}