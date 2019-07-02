import * as JsEncryptModule from 'jsencrypt';

const crypt = new JsEncryptModule.JSEncrypt({ default_key_size: 2056 });

export function generateKeypair() {
  return {
    publicKey: crypt.getPublicKey(),
    privateKey: crypt.getPrivateKey(),
  };
}

export function encrypt(content, publicKey) {
  crypt.setKey(publicKey);
  return crypt.encrypt(content);
}

export function decrypt(content, privateKey) {
  crypt.setKey(privateKey);
  return crypt.decrypt(content);
}
