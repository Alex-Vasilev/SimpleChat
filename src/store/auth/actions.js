import { createAction } from 'redux-actions';

import api from '../../api';
import { auth as getUserCredentials } from '../../api/auth';
import { getConversation } from '../../api/conversation';


import { SET_USER_CREDENTIALS } from './types';
import { navigate } from '../navigation/actions';
import { gotMessages } from '../messages/actions';


import * as ROUTES from '../../constants/routes'

const setUserCredentials = createAction(SET_USER_CREDENTIALS);

export function initAuth() {
  return function (dispatch, getState) {
    const { accessToken } = getState().auth;




  };
}

export function login() {
  return function (dispatch, getState) {
    getUserCredentials()
      .then(res =>
        getConversation()
          .then(res => {
            dispatch(gotMessages(res))
            dispatch(navigate(ROUTES.CHAT))
          })
      )
  }
}

// export function auth() {
//   return function (dispatch) {
//     return generateUniqueId()
//       .then(uniqueId => {
//         return getUserCredentials(uniqueId);
//       })
//       .then(response => {
//         if (response) {
//           dispatch(setUserCredentials(response));
//           return response.access_token;
//         }
//       })
//       .catch(console.warn);
//   };
// }
