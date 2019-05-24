import api from './index';

const CHAT = '/chats';

export function getConversation() {
  return api.fetch(CHAT, {
    method: 'GET',
  });
}
