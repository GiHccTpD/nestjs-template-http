export function parseJSON(val) {
  try {
    return JSON.parse(val);
  } catch {
    return null;
  }
}

export function ignoreJSON(val, keys: Array<string>) {
  if (!val) {
    return null;
  }

  const rst = {};
  for (const key in val) {
    if (!keys.includes(key)) {
      rst[key] = val[key];
    }
  }
  return rst;
}

export function reserveJSON(val, keys: Array<string>) {
  if (!val) {
    return null;
  }

  const rst = {};
  for (const key in val) {
    if (keys.includes(key)) {
      rst[key] = val[key];
    }
  }
  return rst;
}

export function ignoreNullJSON(value: any) {
  if (!value) {
    return [];
  }

  const rst = [];
  for (const item of value) {
    if (item) {
      rst.push(item);
    }
  }
  return rst;
}
