import { RSA } from 'react-native-rsa-native';

export function generateKeypair() {
  return RSA.generateKeys(2056);
}

export function encrypt(content, publicKey) {
  return RSA.encrypt(content, publicKey);
}

export function decrypt(content, privateKey) {
  return RSA.decrypt(content, privateKey);
}
