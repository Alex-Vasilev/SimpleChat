import { auth as getUserCredentials } from '../../api/auth';
import { refreshToken as getNewToken } from '../../api/token';
import * as ROUTES from '../../constants/routes';
import { setChats } from '../chats/actions';
import { reset } from '../navigation/actions';
import { runSocket } from '../socket';
import { removeUserInfo, setUserInfo } from '../user/actions';


export const initAuth = () => (dispatch, getState) => {
  const { _token } = getState().user;

  // dispatch(removeUserInfo())
  runSocket(_token);
  dispatch(reset(ROUTES.CHATS));
};

export const auth = (name, password, isLogin) => (dispatch) => {
  getUserCredentials(name, password, isLogin)
    .then((res) => {
      if (res.success) {
        Promise.all([
          dispatch(setUserInfo(res)),
          dispatch(setChats(res.chats)),
        ])
          .then(() => {
            dispatch(initAuth());
          });
      }
    });
};

export const logout = () => (dispatch) => {
  dispatch(removeUserInfo());
  dispatch(reset(ROUTES.LOGIN));
};


export const refreshToken = () => (dispatch, getState) => {
  const {
    _token, refreshToken, name, _id,
  } = getState().user;

  getNewToken(_token, refreshToken, name, _id)
    .then((res) => {
      if (res.success) {
        Promise.resolve(dispatch(setUserInfo(res)))
          .then(() => {
            dispatch(initAuth());
          });
      }
    });
};
