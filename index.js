const { live, take } = require('./src/ganic')

const {
  attachRef,
  attachState,
  attachTimeout,
  attachInterval
} = require('../src/attach')

module.exports = {
  live,
  take,

  attachRef,
  attachState,
  attachTimeout,
  attachInterval
}
