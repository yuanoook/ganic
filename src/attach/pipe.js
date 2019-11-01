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

const throttleParasitism = ({value, idle}, give, lastGiveTime = 0) => {
  const now = Date.now();
  const timeGap = now - lastGiveTime;
  const availableTime = idle - timeGap;
  const giveValue = () => {
    lastGiveTime = Date.now();
    give(value);
  }
  let timer;
  if (availableTime <= 0) {
    giveValue();
  } else {
    timer = setTimeout(giveValue, availableTime)
  }

  return () => {
    timer && clearTimeout(timer);
    return lastGiveTime;
  }
}

const attachThrottle = (value, idle) => {
  return attach(throttleParasitism, {value, idle}, value);
};

module.exports = {
  attachDebounce,
  attachThrottle,
};
