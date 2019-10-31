const { take } = require('./ganic')
const { attachRef } = require('./attach-base')

const timeoutParasitism = ({delay, callbackRef}) => {
  if (!delay) return
  const timer = setTimeout(() => {
    callbackRef.current()
  }, delay)
  return () => {
    clearTimeout(timer);
  }
}

const attachTimeout = (delay, callback) => {
  const callbackRef = attachRef()
  callbackRef.current = callback
  return take({delay, callbackRef: callbackRef}).attach(timeoutParasitism).firstGive()
}

const intervalParasitism = ({delay, callbackRef}) => {
  if (!delay) return
  const timer = setInterval(() => {
    callbackRef.current()
  }, delay)
  return () => {
    clearInterval(timer);
  }
}

const attachInterval = (delay, callback) => {
  const callbackRef = attachRef()
  callbackRef.current = callback
  take({delay, callbackRef: callbackRef}).attach(intervalParasitism).firstGive()
}

module.exports = {
  attachTimeout,
  attachInterval
}
