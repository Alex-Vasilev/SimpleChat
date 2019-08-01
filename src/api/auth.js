import * as API from '../constants/api';
import api from './index';


export const auth = (
  isLogin,
  name,
  password,
  email,
  countryCode,
  phone,
  isTwoFA,
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
      phone,
      isTwoFA,
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

export const logout = (token) => {
  api.fetch(API.LOGOUT, token, {
    method: 'GET',
  });
};
