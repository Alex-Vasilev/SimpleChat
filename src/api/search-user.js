import api from './index';

const SEARCH = '/search';

export function searchUser(name) {
  return api.fetch(SEARCH, {
    method: 'POST',
    data: {
      name
    },
  });
}
