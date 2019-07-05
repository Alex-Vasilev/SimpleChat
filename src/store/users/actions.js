import { createAction } from 'redux-actions';
import { searchUser } from '../../api/search-user';
import { SET_USERS } from './types';


export const setUsersAction = createAction(SET_USERS);


export const search = name => (dispatch, getState) => {
  const { _token } = getState().user;
  searchUser(name, _token)
    .then((users) => {
      users.err
        ? dispatch(setUsersAction([]))
        : dispatch(setUsersAction(users));
    })
    .catch(() => dispatch(setUsersAction([])));
};
