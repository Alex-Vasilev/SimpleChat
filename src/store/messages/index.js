import { SET_MESSAGES, SET_NEW_MESSAGE } from './types';


const initialState = {
  messages: []
};


export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    case SET_NEW_MESSAGE:
      return {
        ...state,
        messages: [action.payload, ...state.messages]
      };
  }

  return state;
}
