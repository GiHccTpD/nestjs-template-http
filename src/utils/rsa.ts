import * as NodeRSA from 'node-rsa';
import * as fs from 'fs-extra';
import * as path from 'path';
import log4j from './log4j';
const keyData = fs.readFileSync(
  path.join(__dirname, '../../public_key.pem'),
  'utf8',
);

export function RsaDecryptPublic(encryData) {
  const pkcsType = 'pkcs8';
  const key = new NodeRSA({ b: 2048 });
  key.importKey(keyData, pkcsType + '-public-pem');
  const decrypted = key.decryptPublic(encryData, 'utf8');
  log4j.i('使用公钥解密后的数据：', decrypted);
  return decrypted;
}
