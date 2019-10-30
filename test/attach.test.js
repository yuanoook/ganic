const { take, live } = require('../src/ganic')

const {
  attachRef,
  attachState,
  attachTimeout,
  attachInterval
} = require('./attach-utils')

describe('attach-utils', () => {
  const mockFn = jest.fn()

  const props = {
    initState: 1,
    delay: 50,
    delayState: 5999
  }

  beforeEach(() => {
    mockFn.mockReset()
  })

  afterEach(() => {

  })

  it('should always get the same thing from attachRef', done => {
    let lastRef = null
    const organism = props => {
      let ref = attachRef()
      if (lastRef) {
        expect(lastRef === ref).toEqual(false)
      }
      lastRef = ref
    }

    // TODO: ...

  })

  it('should call timeout with attachTimeout', done => {
    const stateOrganism = props => {
      let [state, setState] = attachState(props.initState)
      attachTimeout(props.delay, () => setState(props.delayState))
      return state;
    }
  
    live(stateOrganism, props).onExcrete(mockFn)
  
    setTimeout(() => {
      expect(mockFn.mock.calls).toEqual([
        [props.initState],
        [props.delayState]
      ]);
      done()
    }, props.delay)
  })

  it('should call periodically with attachInterval', done => {

  })
})
