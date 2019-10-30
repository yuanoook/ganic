const { take } = require('./ganic');

const attachRef = () => {
  return take().attach({}).firstGive()
}

const stateParasitism = (deps, give) => {
  let state = deps;
  let setState = (newState) => {
    if (!setState) return
    state = typeof newState === 'function'
      ? newState(state)
      : newState
    give([state, setState])
  }
  give([state, setState])
  return () => {
    state = null
    setState = null
  }
}

const attachState = initState => {
  return take(initState).attach(stateParasitism).firstGive()
}

const timeoutParasitism = ({delay, callbackRef}) => {
  if (!delay) return
  let timer = setTimeout(() => {
    callbackRef.current()
  }, delay)
  return () => {
    clearTimeout(timer);
  }
}

const attachTimeout = (delay, callback) => {
  let callbackRef = attachRef()
  callbackRef.current = callback
  take({delay, callbackRef: callbackRef}).attach(timeoutParasitism).firstGive()
}

const intervalParasitism = ({delay, callbackRef}) => {
  if (!delay) return
  let timer = setInterval(() => {
    callbackRef.current()
  }, delay)
  return () => {
    clearInterval(timer);
  }
}

const attachInterval = (delay, callback) => {
  let callbackRef = attachRef()
  callbackRef.current = callback
  take({delay, callbackRef: callbackRef}).attach(intervalParasitism).firstGive()
}

module.exports = {
  attachRef,
  attachState,
  attachTimeout,
  attachInterval
}
