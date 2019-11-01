'use strict';

const { live } = require('./src/Ganic');

const {
  attach,

  attachRef,
  attachMemo,
  attachState,
  attachEffect,

  attachTimeout,
  attachInterval,

  attachDebounce,
  attachThrottle,
} = require('./src/attach');

module.exports = {
  live,
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
