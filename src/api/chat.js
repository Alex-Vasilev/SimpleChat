import * as API from '../constants/api';
import api from './index';

export const getChats = token => api.fetch(API.CHATS, token, {
  method: 'GET',
});

export const newChat = (recieverId, token) => api.fetch(API.NEW_CHAT, token, {
  method: 'POST',
  data: {
    recieverId,
  },
});
