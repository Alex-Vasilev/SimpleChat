import { APP_STATE_CHANGE, SET_PENDING } from './types';

const initialState = {
  appState: null,
  pending: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case APP_STATE_CHANGE:
      return {
        ...state,
        appState: action.payload,
      };

    case SET_PENDING:
      return {
        ...state,
        pending: action.payload,
      };

    default: return state;
  }
}
