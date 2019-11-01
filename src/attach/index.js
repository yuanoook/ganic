const {
  attach,

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
  attach,

  attachRef,
  attachMemo,
  attachState,
  attachEffect,

  attachTimeout,
  attachInterval
}
