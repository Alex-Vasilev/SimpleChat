import { createAction } from 'redux-actions';
import api from '../../api';
import { auth as getUserCredentials } from '../../api/auth';
import { getConversations } from '../../api/conversations';
import * as ROUTES from '../../constants/routes';
import { navigate } from '../navigation/actions';
import { SET_USER_CREDENTIALS } from './types';



const setUserCredentials = createAction(SET_USER_CREDENTIALS);

export function initAuth() {
  return function (dispatch, getState) {
    const { accessToken } = getState().auth;

  };
}


export function auth(name, password, isLogin) {
  return function (dispatch, getState) {
    getUserCredentials(name, password, isLogin)
      .then(res => {
        api.setToken(res._token)

        getConversations(res._id)
          .then(res => {
            dispatch(navigate(res.length ? ROUTES.CONVERSATIONS : ROUTES.USERS))
          })
      })
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
