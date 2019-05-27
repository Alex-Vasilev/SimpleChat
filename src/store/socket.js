import io from 'socket.io-client';
import { gotMessages } from '../store/messages/actions'

let token = ''

const socket = io('http://localhost:5000');
socket.connect();


export const openChat = users => {
    socket.emit('chat', users);
};

export const sendMessage = (text, sender, receiver) => {
    socket.emit('send message', text);
};

export const login = (name, password) => {
    socket.emit('login', { name, password });
}

export const registration = (name, password) => {
    socket.emit('registration', { name, password });
}

export const configureSocket = function (store) {
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