'use strict';

const {attach, attachRef} = require('./base');

const makeTimeParasitism = (setTimer, clearTimer) => {
  return ({delay, callbackRef}) => {
    if (typeof delay !== 'number') {
      return;
    }
    const timer = setTimer(() => {
      callbackRef.current();
    }, delay);
    return () => {
      clearTimer(timer);
    };
  };
};

const makeTimeAttach = (parasitism, {callback, delay}) => {
  const callbackRef = attachRef();
  callbackRef.current = callback;
  return attach(parasitism, {delay, callbackRef: callbackRef});
};

const timeoutParasitism = makeTimeParasitism(setTimeout, clearTimeout);
const intervalParasitism = makeTimeParasitism(setInterval, clearInterval);

const attachTimeout = (callback, delay) =>
  makeTimeAttach(timeoutParasitism, {callback, delay});
const attachInterval = (callback, delay) =>
  makeTimeAttach(intervalParasitism, {callback, delay});

module.exports = {
  attachTimeout,
  attachInterval,
};
