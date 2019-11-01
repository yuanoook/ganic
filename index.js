'use strict';

const {live, attach} = require('./src/Ganic');

const {
  attachRef,
  attachState,
  attachEffect,

  attachTimeout,
  attachInterval,
} = require('../src/attach');

module.exports = {
  live,
  attach,

  attachRef,
  attachState,
  attachEffect,

  attachTimeout,
  attachInterval,
};
