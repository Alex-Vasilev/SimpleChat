import { createSelector } from 'reselect';


const selectChatsCollection = state => state.chats.userChats;


export const getChats = createSelector(
  [selectChatsCollection],
  chats => chats,
);
