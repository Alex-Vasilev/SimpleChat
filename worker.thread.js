import { self } from 'react-native-threads';
import * as JsEncryptModule from 'jsencrypt';

let crypt = null;
let privateKey = null;

function generateKeypair() {
  crypt = new JsEncryptModule.JSEncrypt({ default_key_size: 2056 });
  privateKey = crypt.getPrivateKey();

  return crypt.getPublicKey();
}

function encrypt(content, publicKey) {
  crypt.setKey(publicKey);
  return crypt.encrypt(content);
}

function decrypt(content) {
  crypt.setKey(privateKey);
  return crypt.decrypt(content);
}

self.onmessage = (e) => {
  const [
    messageType,
    // messageId,
    text,
    key,
  ] = e.split(',');

  let result;
  switch (messageType) {
    case 'generate-keys':
      result = generateKeypair();
      break;
    case 'encrypt':
      result = encrypt(text, key);
      break;
    case 'decrypt':
      result = decrypt(text);
      break;

    default: result = 'res';
  }

  self.postMessage(result);
};
