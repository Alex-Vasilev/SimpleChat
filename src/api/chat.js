import * as API from '../constants/api';
import api from './index';


export const newChat = (recieverId, token) => api.fetch(
  API.NEW_CHAT,
  token,
  {
    method: 'POST',
    data: {
      recieverId,
    },
  },
);

export const addUser = (recieverId, chatId, token) => api.fetch(
  API.ADD_USER_TO_CHAT,
  token,
  {
    method: 'POST',
    data: {
      recieverId,
      chatId,
    },
  },
);
