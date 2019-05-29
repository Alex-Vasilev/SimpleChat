import api from '../../api';
import { auth as getUserCredentials } from '../../api/auth';
import { getChats } from '../../api/chat';
import * as ROUTES from '../../constants/routes';
import { setChats } from '../chats/actions';
import { navigate } from '../navigation/actions';
import { runSoket } from '../socket';
import { setUserInfo } from '../user/actions';




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
        runSoket()
        dispatch(setUserInfo(res))
        getChats(res._id)
          .then(chats => {
            if (chats.length) {
              dispatch(setChats(chats))
              dispatch(navigate(ROUTES.CHATS))
            } else {
              dispatch(navigate(ROUTES.USERS))
            }
          })
      })
  }
}
