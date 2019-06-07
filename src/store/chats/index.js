import { SET_CHAT, SET_CHATS } from './types';


const initialState = {
  userChats: [],
  currentChat: {}
};


export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CHATS:
      return {
        ...state,
        userChats: action.payload
      }
    case SET_CHAT:
      return {
        ...state,
        currentChat: action.payload
      }

  }

  return state;
}
