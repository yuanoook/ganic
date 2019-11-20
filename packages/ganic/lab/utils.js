const shallowEqual = (a, b) => {
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') {
    return a === b || (a === undefined && b === null) || (a === null && b === undefined);
  }
  return a === b || !Object.keys(Object.assign({}, a, b)).find(key => a[key] !== b[key]);
};

module.exports = {
  shallowEqual,
};
