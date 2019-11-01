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

const throttleParasitism = ({value, idle}, give, parasite) => {
  const lastUpdateAt = parasite.$lastupdate || 0;
  const now = Date.now();

  const timeGap = now - lastUpdateAt;
  const availableTimeGap = idle - timeGap;
  const updateImmediately = availableTimeGap <= 0;

  const update = () => {
    parasite.$lastupdate = Date.now()
    give(value)
  }

  if (updateImmediately) {
    update();
    return;
  }

  const timer = setTimeout(update, availableTimeGap)

  return () => {
    clearTimeout(timer)
  }
}

const attachThrottle = (value, idle) => {
  return attach(throttleParasitism, {value, idle}, value);
};

module.exports = {
  attachDebounce,
  attachThrottle,
};
