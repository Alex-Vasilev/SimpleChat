import { createAction } from 'redux-actions';
import { searchUser } from '../../api/search-user';
import { SET_USERS } from './types';


const setUsersAction = createAction(SET_USERS);


export const search = name => dispatch => {
    searchUser(name)
        .then(users => {
            return dispatch(setUsersAction(users))
        })
}
