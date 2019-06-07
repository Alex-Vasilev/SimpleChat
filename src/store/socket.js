import io from 'socket.io-client';
import { setMessage } from './messages/actions';
import * as API from '../constants/api';
import { refreshToken } from './auth/actions';


let socket;
let store;

export const configureSocket = (s) => {
  store = s;
};

export const runSocket = (token) => {
  socket = io(API.DOMAIN, {
    query: { token },
  });
  socket.connect();

  socket.on('error', (e) => {
    if (e === 'Authentication error') {
      store.dispatch(refreshToken());
    }
  });

  socket.on('new_message', ([message]) => {
    store.dispatch(setMessage(message));
  });
};

export const sendMessage = (message) => {
  socket.emit('send_message', message);
};
