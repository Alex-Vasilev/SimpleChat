import { auth as getUserCredentials, logout as removeUserCredentials } from '../../api/auth';
import { getChats } from '../../api/chat';
import * as ROUTES from '../../constants/routes';
import { setChats } from '../chats/actions';
import { reset } from '../navigation/actions';
import { runSocket } from '../socket';
import { setUserInfo, removeUserInfo } from '../user/actions';



export const initAuth = () => (dispatch, getState) => {
  const { _token, _id } = getState().user;
  runSocket(_token);
  getChats(_id, _token)
    .then((chats) => {
      if (chats.length) {
        dispatch(setChats(chats))
        dispatch(reset(ROUTES.CHATS))
      } else {
        dispatch(reset(ROUTES.USERS))
      }
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
