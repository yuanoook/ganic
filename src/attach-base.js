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

const attachMemo = (fn, deps) => {
  return take(deps).attach((deps, give) => give(fn(deps))).firstGive()
}

const attachEffect = (parasitism, deps) => {
  const isDepsNull = deps === null || deps === undefined
  const takeDeps = !isDepsNull ? deps : Math.random()

  return take(takeDeps).attach(() => parasitism(deps)).firstGive()
}

module.exports = {
  attachRef,
  attachState,
  attachMemo,
  attachEffect
}
