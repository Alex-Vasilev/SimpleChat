import * as API from '../constants/api';
import api from './index';


export const auth = (name, password, isLogin) => api.fetch(
  isLogin ? API.LOGIN : API.REGISRATION,
  null,
  {
    method: 'POST',
    data: {
      name,
      password,
    },
  },
);

export const logout = token => api.fetch(API.LOGOUT, token, {
  method: 'GET',
});
