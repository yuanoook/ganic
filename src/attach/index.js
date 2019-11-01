'use strict';

const {
  attach,

  attachRef,
  attachMemo,
  attachState,
  attachEffect,
} = require('./base');

const {attachTimeout, attachInterval} = require('./time');

const {attachDebounce, attachThrottle} = require('./pipe');

module.exports = {
  attach,

  attachRef,
  attachMemo,
  attachState,
  attachEffect,

  attachTimeout,
  attachInterval,

  attachDebounce,
  attachThrottle,
};
