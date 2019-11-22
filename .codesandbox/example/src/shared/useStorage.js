import { useState, useMemo } from "ganic-usex";

const getStoredValue = (key, initValue) => {
  try {
    return JSON.parse(window.localStorage[key]);
  } catch (e) {
    return initValue;
  }
};

const setStoredValue = (key, value) => {
  try {
    window.localStorage[key] = JSON.stringify(value);
  } catch (e) {}
};

const useStorage = (key, defaultValue) => {
  const initValue = useMemo(getStoredValue(key, defaultValue));
  const [value, setValue] = useState(initValue);
  setStoredValue(key, value);
  return [value, setValue];
};

export default useStorage;
