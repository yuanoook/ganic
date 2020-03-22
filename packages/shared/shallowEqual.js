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
  return length === keyList(b).length;
};

module.exports = shallowEqual;
