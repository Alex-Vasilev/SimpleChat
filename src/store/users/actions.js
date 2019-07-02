import { createAction } from 'redux-actions';
import { searchUser } from '../../api/search-user';
import { SET_USERS } from './types';


const setUsersAction = createAction(SET_USERS);


export const search = name => (dispatch, getState) => {
  const { _token } = getState().user;
  searchUser(name, _token)
    .then((users) => {
      dispatch(setUsersAction(users));
    })
    .catch(() => dispatch(setUsersAction([])));
};
