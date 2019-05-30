import { SET_MESSAGES, SET_NEW_MESSAGE } from './types';


const initialState = {
  incomingMessages: []
};


export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        incomingMessages: action.payload
      };
    case SET_NEW_MESSAGE:
      return {
        ...state,
        incomingMessages: [action.payload, ...state.incomingMessages]
      };
  }

  return state;
}
