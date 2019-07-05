// import { Platform } from 'react-native';

export const DOMAIN = 'http://172.18.200.147:5000';
// TODO : need to improve
// Platform.OS === 'android'
//     ? 'http://172.18.200.147:5000' :
//     'http://localhost:5000';

export const AUTH = '/auth';
export const LOGIN = `${AUTH}/login`;
export const LOGOUT = `${AUTH}/logout`;
export const SMS = `${AUTH}/sms`;
export const VERIFY = `${AUTH}/verify`;
export const REGISRATION = `${AUTH}/registration`;
export const CHATS = '/chat';
export const NEW_CHAT = `${CHATS}/new`;
export const ADD_USER_TO_CHAT = `${CHATS}/add_user`;
export const SEARCH = '/search';
export const REFRESH_TOKEN = '/token';
