const {
  attachRef,
  attachMemo,
  attachState,
  attachEffect
} = require('./attach-base')

const {
  attachTimeout,
  attachInterval
} = require('./attach-time')

module.exports = {
  attachRef,
  attachMemo,
  attachState,
  attachEffect,

  attachTimeout,
  attachInterval
}
