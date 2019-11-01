'use strict';

const {attach} = require('./base');

const debounce = function (idle, action) {
  var last
  return function() {
    var ctx = this, args = arguments
    clearTimeout(last)
    last = setTimeout(function(){
      action.apply(ctx, args)
    }, idle)
  }
}

const debounceParasitism = ({value, idle}, give) => {
  const timer = setTimeout(() => give(value), idle)
  return () => {
    clearTimeout(timer)
  }
};

const attachDebounce = (value, idle) => {
  return attach(debounceParasitism, {value, idle}, value)
};

const attachThrottle = (deps, idle) => {

};

module.exports = {
  attachDebounce,
  attachThrottle,
};
