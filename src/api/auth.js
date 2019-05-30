import * as API from '../constants/api';
import api from './index';


export function auth(name, password, isLogin) {
  return api.fetch(isLogin ? API.LOGIN : API.REGISRATION, {
    method: 'POST',
    data: {
      name,
      password
    },
  });
}
