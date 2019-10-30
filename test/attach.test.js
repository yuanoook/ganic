const { take, live } = require('../src/ganic');

test('attach  rightly', done => {  
  const mockFn = jest.fn()

  const stateParasitism = (deps, give) => {
    let state = deps;
    let setState = (newState) => {
      state = typeof newState === 'function'
        ? newState(state)
        : newState
      give([state, setState])
    }
    give([state, setState])
  }

  const attachState = initState => {
    return take(initState).attach(stateParasitism).firstGive()
  }

  const attachRef = () => {
    return take().attach({})
  }

  const timeoutParasitism = ({delay, callbackRef}) => {
    if (!delay) return
    let timer = setTimeout(() => {
      callbackRef.current()
    }, delay)
    mockFn('attach: ', delay)
    return () => {
      mockFn('detach: ', delay)
      clearTimeout(timer);
    }
  }

  const attachTimeout = (delay, callback) => {
    let callbackRef = attachRef()
    callbackRef.current = callback
    take({delay, callbackRef: callbackRef}).attach(timeoutParasitism).firstGive()
  }

  const props = {
    initState: 1,
    delay: 100,
    delayState: 5999
  }

  const stateOrganism = props => {
    let [state, setState] = attachState(props.initState)
    attachTimeout(props.delay, () => setState(props.delayState))
    return state;
  }

  live(stateOrganism, props).onExcrete(r => {
    mockFn('ex: ', r)
  })

  setTimeout(() => {
    console.log(mockFn.mock.calls)
    expect(mockFn.mock.calls).toEqual([
      ['attach: ', props.delay],
      ['ex: ', props.initState],
      ['ex: ', props.delayState]
    ]);
    done()
  }, props.delay)
});
