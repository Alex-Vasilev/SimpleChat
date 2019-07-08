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

    case SET_PUBLIC_KEY:
      const publicKeys = (state.publicKeys
        && state.publicKeys[action.payload._id]) || {};
      return {
        ...state,
        publicKeys: {
          ...state.publicKeys,
          [action.payload._id]: {
            ...publicKeys,
            [action.payload.chatId]: action.payload.key,
          },
        },
      };

    case SET_PRIVATE_KEY:
      const privateKeys = (state.privateKeys
        && state.privateKeys[action.payload._id]) || {};
      return {
        ...state,
        privateKeys: {
          ...state.privateKeys,
          [action.payload._id]: {
            ...privateKeys,
            [action.payload.chatId]: action.payload.key,
          },
        },
      };

    case SET_DESTINATION_KEY:
      const destinationKeys = (state.destinationKeys
        && state.destinationKeys[action.payload._id]) || {};
      return {
        ...state,
        destinationKeys: {
          ...state.destinationKeys,
          [action.payload._id]: {
            ...destinationKeys,
            [action.payload.chatId]: action.payload.key,
          },
        },
      };

    default: return state;
  }
}
