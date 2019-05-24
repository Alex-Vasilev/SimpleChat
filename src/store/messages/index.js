import { GOT_MESSAGES, GOT_NEW_MESSAGE } from './types';


const initialState = {};


export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES:
      return action.payload ? action.payload : [];
    case GOT_NEW_MESSAGE:
      return [action.payload, ...state];
  }

  return state;
}
