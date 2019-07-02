import {
  SET_CHAT,
  SET_CHATS,
  UPDATE_CHAT,
  SET_CHAT_TYPE,
} from './types';


const initialState = {
  userChats: [],
  currentChat: {},
  type: null,
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
      return {
        ...state,
        currentChat: {
          ...state.currentChat,
          messages: [action.payload, ...state.currentChat.messages],
        },
      };

    case SET_CHAT_TYPE:
      return {
        ...state,
        type: action.payload,
      };

    default: return state;
  }
}
