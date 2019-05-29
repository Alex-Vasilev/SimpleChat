import { GOT_USERS, GOT_NEW_USER } from './types';


const initialState = {
  users: []
};


export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_USERS:
      return {
        ...state,
        users: action.payload
      };
    // case GOT_NEW_USER:
    //   if (!state.find(user => user.id === action.user.id)) {
    //     return [...state, action.user];
    //   } else {
    //     return state;
    //   }
  }

  return state;
}
