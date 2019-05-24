import { GOT_USERS, GOT_NEW_USER } from './types';

const initialState = {};


export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_USERS:
      return action.users;
    case GOT_NEW_USER:
      if(!state.find(user => user.id === action.user.id)) {
        return [...state, action.user];
      } else {
        return state;
      }
  }

  return state;
}
