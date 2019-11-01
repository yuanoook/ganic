'use strict';

const {attach} = require('./base');

const debounceParasitism = ({value, idle}, give) => {
  const timer = setTimeout(() => give(value), idle)
  return () => {
    clearTimeout(timer)
  }
};

const attachDebounce = (value, idle) => {
  return attach(debounceParasitism, {value, idle}, value);
};

const throttle = function (delay, action) {
  var last = 0
  return function () {
    var curr = +new Date()
    if (curr - last > delay) {
      action.apply(this, arguments)
      last = curr
    }
  }
}

const throttleParasitism = ({value, idle}, give, lastTime = 0) => {
  const timeLeft = lastTime + idle - Date.now();
  const update = () => {
    lastTime = Date.now();
    give(value);
  }
  const timer = timeLeft <= 0 ? update() : setTimeout(update, timeLeft)
  return () => {
    timer && clearTimeout(timer);
    return lastTime;
  }
}

const attachThrottle = (value, idle) => {
  return attach(throttleParasitism, {value, idle}, value);
};

module.exports = {
  attachDebounce,
  attachThrottle,
};
