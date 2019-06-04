import * as API from '../constants/api';
import api from './index';


export const refreshToken = (token, refreshToken, name, _id) => api.fetch(API.REFRESH_TOKEN, token, {
  method: 'POST',
  data: {
    refreshToken,
    name,
    _id,
  },
});
