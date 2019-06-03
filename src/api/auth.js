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

export const refreshToken = (refreshToken, _id, name, token) => {
  return api.fetch(API.REFRESH_TOKEN, token, {
    method: 'POST',
    data: { refreshToken, _id, name }
  });
}