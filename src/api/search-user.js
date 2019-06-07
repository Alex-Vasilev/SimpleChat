import * as API from '../constants/api';
import api from './index';


export const searchUser = (name, token) => {
  return api.fetch(API.SEARCH, token, {
    method: 'POST',
    data: {
      name
    },
  });
}
