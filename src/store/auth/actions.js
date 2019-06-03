import { auth as getUserCredentials, logout as removeUserCredentials } from '../../api/auth';
import { getChats } from '../../api/chat';
import { refreshToken as getNewToken } from '../../api/auth';

import * as ROUTES from '../../constants/routes';
import { setChats } from '../chats/actions';
import { reset } from '../navigation/actions';
import { runSocket } from '../socket';
import { setUserInfo, removeUserInfo } from '../user/actions';



export const initAuth = () => (dispatch, getState) => {
  const { _token, _id } = getState().user;
  console.log(getState().user)
  // dispatch(removeUserInfo())
  runSocket(_token);
  getChats(_id, _token)
    .then((chats) => {
      // TODO: need to improve
      if (chats.length) {
        dispatch(setChats(chats))
      }
      dispatch(reset(ROUTES.CHATS))
    })
}

export const auth = (name, password, isLogin) => (dispatch) => {
  getUserCredentials(name, password, isLogin)
    .then(res => {
      if (res.success) {
        Promise.resolve(dispatch(setUserInfo(res)))
          .then(() => {
            dispatch(initAuth())
          })
      }
    })
}

export const logout = () => (dispatch) => {
  // removeUserCredentials()
  //   .then(() => {
  dispatch(removeUserInfo())
  // })
}


export const refreshToken = () => (dispatch, getState) => {
  const { _token, refreshToken, _id, name } = getState().user;

  getNewToken(refreshToken, _token, _id, name)
    .then(res => {
      if (res.success) {
        Promise.resolve(dispatch(setUserInfo(res)))
          .then(() => {
            dispatch(initAuth())
          })
      }
    })
}