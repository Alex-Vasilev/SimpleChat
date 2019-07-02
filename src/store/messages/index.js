import {
  // SET_MESSAGES,
  // SET_NEW_MESSAGE,
  SET_PUBLIC_KEY,
  SET_DESTINATION_KEY,
  SET_PRIVATE_KEY,
} from './types';


const initialState = {
  // incomingMessages: [],
  destinationKeys: {},
  publicKeys: {},
  privateKeys: {},
};


export default function (state = initialState, action) {
  switch (action.type) {
    // case SET_MESSAGES:
    //   return {
    //     ...state,
    //     incomingMessages: action.payload,
    //   };
    // case SET_NEW_MESSAGE:
    //   return {
    //     ...state,
    //     incomingMessages: [action.payload, ...state.incomingMessages],
    //   };
    // TODO: need to improve
    case SET_PUBLIC_KEY:
      return {
        ...state,
        publicKeys: {
          ...state.publicKeys,
          [action.payload._id]: {
            ...state.publicKeys[action.payload._id],
            [action.payload.chatId]: action.payload.key,
          },
        },
      };

    case SET_PRIVATE_KEY:
      return {
        ...state,
        privateKeys: {
          ...state.privateKeys,
          [action.payload._id]: {
            ...state.privateKeys[action.payload._id],
            [action.payload.chatId]: action.payload.key,
          },
        },
      };

    case SET_DESTINATION_KEY:
      return {
        ...state,
        destinationKeys: {
          ...state.destinationKeys,
          [action.payload._id]: {
            ...state.destinationKeys[action.payload._id],
            [action.payload.chatId]: action.payload.key,
          },
        },
      };

    default: return state;
  }
}
