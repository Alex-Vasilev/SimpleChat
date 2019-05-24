import { AsyncStorage } from 'react-native';

const KEY_PREFIX = '@CHAT_STORE:';

export function fetchItem(key) {
  return AsyncStorage.getItem(KEY_PREFIX + key).then(v => {
    try {
      return JSON.parse(v);
    } catch (ex) {
      return v;
    }
  });
}

export function pushItem(key, value) {
  value = typeof value == 'string' ? value : JSON.stringify(value);
  return AsyncStorage.setItem(KEY_PREFIX + key, value);
}

export function removeItem(key) {
  return AsyncStorage.removeItem(KEY_PREFIX + key);
}
