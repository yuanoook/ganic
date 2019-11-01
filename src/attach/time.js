'use strict';

const {attach, attachRef} = require('./base');

const makeTimeParasitism = (setTimer, clearTimer) => {
  return ({delay, callbackRef}) => {
    if (!delay) return;
    const timer = setTimer(() => {
      callbackRef.current();
    }, delay);
    return () => {
      clearTimer(timer);
    };
  };
};

const makeTimeAttach = (delay, callback, parasitism) => {
  const callbackRef = attachRef();
  callbackRef.current = callback;
  return attach(parasitism, {delay, callbackRef: callbackRef});
};

const timeoutParasitism = makeTimeParasitism(setTimeout, clearTimeout);
const intervalParasitism = makeTimeParasitism(setInterval, clearInterval);

const attachTimeout = (delay, callback) =>
  makeTimeAttach(delay, callback, timeoutParasitism);
const attachInterval = (delay, callback) =>
  makeTimeAttach(delay, callback, intervalParasitism);

module.exports = {
  attachTimeout,
  attachInterval,
};
