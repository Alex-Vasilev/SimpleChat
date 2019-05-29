import api from './index';

const CHATS = '/chat';
const NEW_CHAT = `${CHATS}/new`;

export function getChats(userId) {
  return api.fetch(CHATS, {
    method: 'POST',
    data: {
      userId
    },
  });
}

export function newChat(userId, recieverId) {
  return api.fetch(NEW_CHAT, {
    method: 'POST',
    data: {
      userId,
      recieverId
    },
  });
}