const keyList = Object.keys;

const shallowEqual = (a, b) => {
  if (a === b) {
    return true;
  }

  if (!(a instanceof Object) || !(b instanceof Object)) {
    return false;
  }

  const keys = keyList(a);
  const length = keys.length;
  for (let i = 0; i < length; i++) {
    if (a[keys[i]] !== b[keys[i]]) {
      return false;
    }
  }

  if ((a instanceof Date) || (b instanceof Date)) {
    if (!(b instanceof Date) || !(a instanceof Date)) {
      return false;
    }
    return a - b === 0;
  }

  return length === keyList(b).length;
};

module.exports = shallowEqual;
