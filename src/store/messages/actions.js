import { createAction } from 'redux-actions';

import { GOT_MESSAGES, GOT_NEW_MESSAGE } from './types';

const gotMessagesAction = createAction(GOT_MESSAGES);
const gotNewMessageAction = createAction(GOT_NEW_MESSAGE);


export function gotMessages(messages) {
    return function (dispatch) {
        return dispatch(gotMessagesAction(messages))
    };
}

export function gotNewMessage(messages) {
    return function (dispatch) {
        return dispatch(gotNewMessageAction(messages))
    };
}
