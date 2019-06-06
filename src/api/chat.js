import * as API from '../constants/api';
import api from './index';


export const newChat = (recieverId, token) => api.fetch(API.NEW_CHAT, token, {
  method: 'POST',
  data: {
    recieverId,
  },
});
