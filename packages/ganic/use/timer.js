
const {attach} = require('../Ganic');
const {useRef} = require('./base');

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

const timeoutParasitism = makeTimeParasitism(setTimeout, clearTimeout);
const intervalParasitism = makeTimeParasitism(setInterval, clearInterval);

const attachTimeParasitism = (parasitism, {callback, delay}) => {
  const callbackRef = useRef();
  callbackRef.current = callback;
  return attach(parasitism, {delay, callbackRef: callbackRef});
};

const useTimeout = (callback, delay) =>
  attachTimeParasitism(timeoutParasitism, {callback, delay});
const useInterval = (callback, delay) =>
  attachTimeParasitism(intervalParasitism, {callback, delay});

module.exports = {
  useTimeout,
  useInterval,
};
