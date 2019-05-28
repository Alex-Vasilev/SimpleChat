import api from './index';

const AUTH = '/auth';
const LOGIN = `${AUTH}/login`;
const LOGOUT = `${AUTH}/logout`;
const REGISRATION = `${AUTH}/registration`;


export function auth(name, password, isLogin) {
  return api.fetch(isLogin ? LOGIN : REGISRATION, {
    method: 'POST',
    data: {
      name,
      password
    },
  });
}
