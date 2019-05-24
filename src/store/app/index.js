import { APP_STATE_CHANGE, SET_DATA } from './types';

const initialState = {
  appState: null,
  autoModeModalVisible: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case APP_STATE_CHANGE:
      return {
        ...state,
        appState: action.state,
      };

    case SET_DATA:
      return {
        ...state,
        ...action.data,
      };
  }

  return state;
}
