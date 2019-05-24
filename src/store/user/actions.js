import { createAction } from 'redux-actions';

import { GOT_USER } from './types';

const gotUserAction = createAction(GOT_USER);


export function gotUser(user) {
    return function (dispatch) {
        return dispatch(gotUserAction(user))
    };
}

