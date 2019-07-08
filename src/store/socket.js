import io from 'socket.io-client';
import * as API from '../constants/api';
import * as ROUTES from '../constants/routes';
import { decrypt } from '../utils/crypt';
import { setPending } from './app/actions';
import { refreshToken } from './auth/actions';
import { setChat, setChats, updateUserChat } from './chats/actions';
import { setDestinationPublicKey } from './messages/actions';
import { navigate } from './navigation/actions';


let socket;
let store;

export const configureSocket = (s) => {
  store = s;
};

export const runSocket = (token) => {
  socket = io(API.DOMAIN, {
    query: { token },
  });

  socket.on('connect', () => {

  });

  socket.on('error', (e) => {
    if (e === 'Authentication error') {
      store.dispatch(refreshToken());
    }
  });

  socket.on('DESTINATION_PUBLIC_KEY', ({ chatId, key }) => {
    store.dispatch(setDestinationPublicKey(chatId, key));
    getCurrentChat(chatId);
  });

  socket.on('SET_CURRENT_CHAT', (chat) => {
    const { _id } = store.getState().user;
    const { userChats } = store.getState().chats;
    const privateKey = store.getState().messages.privateKeys[_id][chat._id];

    const chatIdx = userChats
      .findIndex(item => item._id === chat._id);
    const updatedChats = [...userChats];
    const decryptMessages = [...chat.messages];

    if (decryptMessages.length > 0) {
      const decryptMessagesPromises = decryptMessages
        .map(message => Promise.resolve(decrypt(message.text, privateKey))
          .then(r => ({
            ...message,
            text: r,
          })));

      Promise.all(decryptMessagesPromises).then((dec) => {
        if (chatIdx > -1) {
          updatedChats[chatIdx] = { ...chat, messages: dec.reverse() };
        } else {
          updatedChats.push(chat);
        }

        store.dispatch(setChat({ ...chat, messages: dec }));
        store.dispatch(setChats(updatedChats));
        store.dispatch(setPending(false));
        store.dispatch(navigate(ROUTES.CHAT));
      });
    } else {
      if (chatIdx > -1) {
        updatedChats[chatIdx] = { ...chat, messages: [] };
      } else {
        updatedChats.push(chat);
      }

      store.dispatch(setChat({ ...chat, messages: [] }));
      store.dispatch(setChats(updatedChats));
      store.dispatch(setPending(false));
      store.dispatch(navigate(ROUTES.CHAT));
    }
  });

  socket.on('new_message', (msg) => {
    const { _id } = store.getState().user;
    const message = msg[_id];
    const privateKey = store
      .getState().messages.privateKeys[_id][message.chatId];

    Promise.resolve(decrypt(message.text, privateKey))
      .then((res) => {
        store.dispatch(updateUserChat({ ...message, text: res }));
      });
  });
};

export const sendMessage = (message) => {
  socket.emit('send_message', message);
};

export const getDestinationKeys = (chatId, userPublicKey) => {
  socket.emit('GET_DESTINATION_PUBLIC_KEY', { chatId, userPublicKey });
};

export const getCurrentChat = (chatId) => {
  socket.emit('GET_CURRENT_CHAT', { chatId });
};
