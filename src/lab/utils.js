'use strict';

const shallowEqual = (a, b) => {
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') {
    return a === b;
  }
  return a === b || !Object.keys(Object.assign({}, a, b)).find(key => a[key] !== b[key]);
};

const flat = (array, depth) => {
  if (array.flat) {
    return array.flat(depth);
  }
  depth = isNaN(depth) ? 1 : Number(depth);
  return depth ? array.reduce(function (acc, cur) {
    if (Array.isArray(cur)) {
      acc.push.apply(acc, flat(cur, depth - 1));
    } else {
      acc.push(cur);
    }
    return acc;
  }, []) : Array.prototype.slice.call(array);
};

module.exports = {
  shallowEqual,
  flat,
};
