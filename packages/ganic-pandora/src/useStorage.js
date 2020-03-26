const { useState } = require('ganic-usex');

const getStoredValue = (key, initValue) => {
  if (!key) {
    return initValue;
  }
  try {
    return JSON.parse(window.localStorage[key]);
  } catch (e) {
    return initValue;
  }
};

const setStoredValue = (key, value) => {
  if (!key) {
    return;
  }
  try {
    window.localStorage[key] = JSON.stringify(value);
  } catch (e) {}
};

const useStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => getStoredValue(key, defaultValue));
  setStoredValue(key, value);
  return [value, setValue];
};

module.exports = useStorage;
