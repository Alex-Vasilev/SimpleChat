import * as API from '../constants/api';
import api from './index';


export const auth = (name, password, isLogin) => {
  return api.fetch(isLogin ? API.LOGIN : API.REGISRATION, null, {
    method: 'POST',
    data: {
      name,
      password
    },
  });
}

export const logout = (token) => {
  return api.fetch(API.LOGOUT, token, {
    method: 'GET'
  });
}