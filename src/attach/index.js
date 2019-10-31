const {
  attachRef,
  attachMemo,
  attachState,
  attachEffect
} = require('./base')

const {
  attachTimeout,
  attachInterval
} = require('./time')

module.exports = {
  attachRef,
  attachMemo,
  attachState,
  attachEffect,

  attachTimeout,
  attachInterval
}
