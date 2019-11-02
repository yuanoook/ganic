'use strict';

const {
  attach,

  attachRef,
  attachMemo,
  attachState,
  attachEffect,
} = require('./base');

const {useTimeout, useInterval} = require('./time');

const {attachDebounce, attachThrottle} = require('./times');

module.exports = {
  attach,

  attachRef,
  attachMemo,
  attachState,
  attachEffect,

  useTimeout,
  useInterval,

  attachDebounce,
  attachThrottle,
};
