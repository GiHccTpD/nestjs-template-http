import * as CryptoJS from 'crypto-js';

const _key = '';
const _iv = '';

export function cryptedAES(data) {
  /**
   * CipherOption, 加密的一些选项:
   *   mode: 加密模式, 可取值(CBC, CFB, CTR, CTRGladman, OFB, ECB), 都在 CryptoJS.mode 对象下
   *   padding: 填充方式, 可取值(Pkcs7, AnsiX923, Iso10126, Iso97971, ZeroPadding, NoPadding), 都在 CryptoJS.pad 对象下
   *   iv: 偏移量, mode === ECB 时, 不需要 iv
   * 返回的是一个加密对象
   */
  const key = CryptoJS.enc.Utf8.parse(_key);
  const iv = CryptoJS.enc.Utf8.parse(_iv);
  const cipher = CryptoJS.AES.encrypt(data, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: CryptoJS.enc.Utf8.parse(iv),
  });
  // 将加密后的数据转换成 Base64
  const base64Cipher = cipher.ciphertext.toString(CryptoJS.enc.Base64);
  return base64Cipher;
}

export function decryptAES(encrypted) {
  const key = CryptoJS.enc.Utf8.parse(_key);
  const iv = CryptoJS.enc.Utf8.parse(_iv);
  // 先将 Base64 还原一下, 因为加密的时候做了一些字符的替换
  const restoreBase64 = encrypted.replace(/\n/g, '');
  // 这里 mode, padding, iv 一定要跟加密的时候完全一样
  // 返回的是一个解密后的对象
  const decipher = CryptoJS.AES.decrypt(restoreBase64, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv,
  });
  // 将解密对象转换成 UTF8 的字符串
  const resultDecipher = CryptoJS.enc.Utf8.stringify(decipher);
  // 返回解密结果
  return resultDecipher;
}

export function decryptAES2JSON(data) {
  try {
    return JSON.parse(decryptAES(decodeURIComponent(data)));
  } catch (e) {
    return {};
  }
}
