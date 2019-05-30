import io from 'socket.io-client';
import api from '../api/index';
import { setMessages, setMessage } from '../store/messages/actions';
import * as API from '../constants/api';

let socket;
let store;

export const configureSocket = s => {
    store = s
}

export const runSocket = () => {
    socket = io(API.DOMAIN, {
        query: { token: api.token }
    });
    socket.connect();


    socket.on("set_messages", messages => {
        store.dispatch(setMessages(messages))
    });

    socket.on('incoming_message', message => {
        store.dispatch(gotNewMessage(message));
    });
}

export const getMessages = chatId => {
    socket.emit('get_messages', chatId);
};

export const sendMessage = message => {
    store.dispatch(setMessage(message))
    socket.emit('send_message', message);
};