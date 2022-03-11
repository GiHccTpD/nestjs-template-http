export function checkUrl(val): boolean {
  return /(http|https):\/\/([\w.]+\/?)\S*/.test(val);
}

export function checkPhone(val): boolean {
  return /^1([3456789])\d{9}$/.test(val);
}

export function checkFixedPhone(val): boolean {
  return /^([1-9]\d{4}\b)|(\b[1-9]\d{7})$/.test(val);
}

export function checkIdCard(val): boolean {
  return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|x|X)$/.test(
    val,
  );
}

export function checkPassport(val): boolean {
  return /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/.test(
    val,
  );
}

export function checkGAPassport(val): boolean {
  return /^[a-zA-Z0-9]{6,10}$/.test(val);
}

export function checkNotNull(val: string) {
  return val && val.trim();
}

export function isImageType(mimetype) {
  return mimetype.includes('image/');
}

export function isLegalFile(ext) {
  return ext !== '.js' && ext !== '.exe';
}

export function isExistKey(obj: object, keys: Array<string>): boolean {
  let flag = true;
  for (const key of keys) {
    if (!obj.hasOwnProperty(key)) {
      flag = false;
    }
  }
  return flag;
}

export function isExistKey2(obj: object, keys: Array<string>): boolean {
  let flag = true;
  for (const key of keys) {
    if (!obj.hasOwnProperty(key) || !obj[key]) {
      flag = false;
    }
  }
  return flag;
}
