import { SET_CHAT, SET_CHATS } from './types';


const initialState = {
  chats: [],
  chat: {}
};


export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CHATS:
      return {
        ...state,
        chats: action.payload
      }
    case SET_CHAT:
      return {
        ...state,
        chat: action.payload
      }

  }

  return state;
}
