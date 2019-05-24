import { GOT_USER } from './types';

const initialState = {};


export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_USER:
      return action.user;
  }

  return state;
}
