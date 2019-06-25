import { auth as getUserCredentials, sendSMS, verify } from '../../api/auth';
import { refreshToken as getNewToken } from '../../api/token';
import * as ROUTES from '../../constants/routes';
import { setChats } from '../chats/actions';
import { reset, navigate } from '../navigation/actions';
import { runSocket } from '../socket';
import { removeUserInfo, setUserInfo } from '../user/actions';


export const initAuth = () => (dispatch, getState) => {
  const { _token } = getState().user;

  // dispatch(removeUserInfo())
  runSocket(_token);
  dispatch(reset(ROUTES.CHATS));
};

export const auth = (...args) => (dispatch) => {
  getUserCredentials(...args)
    .then((res) => {
      if (res.success) {
        dispatch(setUserInfo(res));
        dispatch(navigate(ROUTES.VERIFY));
        dispatch(sendVerificationSMS());
      }
    });
};

export const sendVerificationSMS = () => (dispatch, getState) => {
  const { name } = getState().user;
  sendSMS(name);
};

export const runVerify = token => (dispatch, getState) => {
  const { name } = getState().user;
  verify(name, token)
    .then((res) => {
      Promise.all([
        dispatch(setUserInfo(res)),
        dispatch(setChats(res.chats)),
      ])
        .then(() => {
          dispatch(initAuth());
        });
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
