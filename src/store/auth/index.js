import { SET_USER_CREDENTIALS } from './types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_CREDENTIALS:
      return {
        ...state,
        id: action.payload.id,
        accessToken: action.payload.access_token,
      };
  }

  return state;
}
