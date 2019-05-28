import io from 'socket.io-client';
import { gotMessages } from '../store/messages/actions'

let token = ''

const socket = io('http://localhost:5000', {
    query: { token: token }
});
socket.connect();


export function openChat(users) {
    socket.emit('chat', users);
};

export function sendMessage(text, sender, receiver) {
    socket.emit('send message', text);
};

export function login(name, password) {
    socket.emit('login', { name, password });
}

export function registration(name, password) {
    socket.emit('registration', { name, password });
}

export function configureSocket(store) {
    socket.emit('authenticate', token)

    socket.on('set token', token => {
        token = token
        socket.emit('authenticate', token)
    })

    socket.on('userCreated', response => {
        const { user, users } = response;
        store.dispatch(gotUser(user));
        store.dispatch(gotUsers(users));
        navigate('Users');
    });

    socket.on("set messages", messages => {
        store.dispatch(gotMessages(messages))
    });

    socket.on('newUser', user => {
        store.dispatch(gotNewUser(user));
    });

    socket.on('incomingMessage', message => {
        store.dispatch(gotNewMessage(message));
    });

    socket.on('set token', (token) => {

    })
}