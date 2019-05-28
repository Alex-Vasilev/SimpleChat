import { createAction } from 'redux-actions';
import { searchUser } from '../../api/search-user';
import { GOT_USERS, GOT_NEW_USER } from './types';


// const gotUsersAction = createAction(GOT_USERS);
// const gotNewUserAction = createAction(GOT_NEW_USER);


// export function gotUsers(users) {
//     return function (dispatch) {
//         return dispatch(gotUsersAction(users))
//     };
// }

// export function gotNewUser(user) {
//     return function (dispatch) {
//         return dispatch(gotNewUserAction(user))
//     };
// }

export function search(name) {
    return function (dispatch) {
        searchUser(name)
            .then(res => {
                console.log(res)
            })
    }
}
