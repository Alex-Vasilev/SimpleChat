import io from 'socket.io-client';
import api from '../api/index';
import { setMessages, setMessage } from '../store/messages/actions';


let socket;
var store;


export function getMessages(chatId) {
    socket.emit('get_messages', chatId);
};

export function sendMessage(message) {
    store.dispatch(setMessage(message))
    socket.emit('send_message', message);
};

export function configureSocket(s) {
    store = s
}

export function runSoket() {
    socket = io('http://localhost:5000', {
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

