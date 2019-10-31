const { live, take } = require('./src/Ganic')

const {
  attachRef,
  attachState,
  attachEffect,

  attachTimeout,
  attachInterval
} = require('../src/attach')

module.exports = {
  live,
  take,

  attachRef,
  attachState,
  attachEffect,

  attachTimeout,
  attachInterval
}
