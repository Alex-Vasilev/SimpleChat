import io from 'socket.io-client';
import { setMessages, setMessage } from '../store/messages/actions';
import * as API from '../constants/api';
import { refreshToken } from '../store/auth/actions';


let socket;
let store;

export const configureSocket = s => {
    store = s
}

export const runSocket = (token) => {
    socket = io(API.DOMAIN, {
        query: { token }
    });
    socket.connect();

    socket.on("error", (e) => {
        if (e == 'Authentication error') {
            store.dispatch(refreshToken())
        }
    });

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