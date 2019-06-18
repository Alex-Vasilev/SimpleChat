import * as API from '../constants/api';
import api from './index';


export const auth = (
  name,
  password,
  email,
  countryCode,
  phoneNumber,
  isLogin,
) => api.fetch(
  isLogin ? API.LOGIN : API.REGISRATION,
  null,
  {
    method: 'POST',
    data: {
      name,
      password,
      email,
      countryCode,
      phoneNumber,
    },
  },
);

export const sendSMS = (name) => {
  api.fetch(
    API.SMS,
    null,
    {
      method: 'POST',
      data: { name },
    },
  );
};

export const verify = (name, token) => {
  api.fetch(
    API.VERIFY,
    null,
    {
      method: 'POST',
      data: { name, token },
    },
  );
};

export const logout = token => api.fetch(API.LOGOUT, token, {
  method: 'GET',
});
