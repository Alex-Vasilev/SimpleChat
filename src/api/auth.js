import api from './index';

const AUTH = '/login';

export function auth() {
  return api.fetch(AUTH, {
    method: 'POST',
    data: {
      email: 'email',
      password: 'pass'
    },
  });
}
