import { SET_CHAT, SET_CHATS, UPDATE_CHAT } from './types';


const initialState = {
  userChats: [],
  currentChat: {},
};


export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CHATS:
      return {
        ...state,
        userChats: action.payload,
      };

    case SET_CHAT:
      return {
        ...state,
        currentChat: action.payload,
      };

    case UPDATE_CHAT:
      const chats = [...state.userChats];
      const idx = chats
        .findIndex(({ _id }) => _id === action.payload.currentChatId);
      chats[idx].messages = [action.payload.message, ...chats[idx].messages];

      return {
        ...state,
        userChats: chats,
      };

    default: return state;
  }
}
