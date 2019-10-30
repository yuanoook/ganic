const { take, live } = require('../src/ganic');

test('attach  rightly', done => {
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

  const timeoutParasitism = ({delay, callback}) => {
    if (!delay) return
    let timer = setTimeout(() => {
      callback.current(5555)
    }, delay)
    mockFn('attach: ', delay)
    return () => {
      mockFn('detach: ', delay)
      clearTimeout(timer);
    }
  }

  const stateOrganism = () => {
    let [state, setState] = take(1).attach(stateParasitism).firstGive()
    console.log(state, setState)

    let callback = take().attach({})
    callback.current = v => setState(v)

    take({delay: 1000, callback}).attach(timeoutParasitism).firstGive()

    return state;
  }

  let mockFn = jest.fn()

  live(stateOrganism).onExcrete(r => {
    mockFn('ex: ', r)
  })

  setTimeout(() => {
    expect(mockFn.mock.calls).toEqual([
      ['attach: ', 1000],
      ['ex: ', 1],
      ['ex: ', 5555]
    ]);
    done()
  }, 2000)
});