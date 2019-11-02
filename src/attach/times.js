'use strict';

const {attach} = require('./base');

const debounceParasitism = ({value, idle}, give) => {
  const timer = setTimeout(() => give(value), idle);
  return () => clearTimeout(timer);
};

const useDebounce = (value, idle) =>
  attach(debounceParasitism, {value, idle}, value);

const throttleParasitism = ({value, idle}, give, {handover: lastTime = 0}) => {
  const timeLeft = lastTime + idle - Date.now();
  const update = () => {
    lastTime = Date.now();
    give(value);
  };
  const timer = timeLeft <= 0 ? update() : setTimeout(update, timeLeft);
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    return lastTime;
  };
};

const useThrottle = (value, idle) =>
  attach(throttleParasitism, {value, idle}, value);

module.exports = {
  useDebounce,
  useThrottle,
};
