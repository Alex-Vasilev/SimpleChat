import { APP_STATE_CHANGE } from './types';

const initialState = {
  appState: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case APP_STATE_CHANGE:
      return {
        ...state,
        appState: action.payload,
      };
  }

  return state;
}
