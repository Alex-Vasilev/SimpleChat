import api from './index';

const CONVERSATIONS = '/conversations';

export function getConversations(userId) {
  return api.fetch(CONVERSATIONS, {
    method: 'POST',
    data: {
      userId
    },
  });
}
