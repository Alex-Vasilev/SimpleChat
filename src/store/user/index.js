import { SET_USER, REMOVE_USER } from './types';

const initialState = {};


export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...action.payload
      }
    case REMOVE_USER:
      return {}
  }

  return state;
}
