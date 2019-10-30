const { take, live } = require('../src/ganic')

const {
  attachRef,
  attachState,
  attachTimeout,
  attachInterval
} = require('./attach-utils')

describe('attach-utils', () => {
  const mockFn = jest.fn()
  const defaultProps = {
    initState: 0,
    delay: 50,
    delayState: 9999
  }

  beforeEach(() => {
    mockFn.mockReset()
  })

  afterEach(() => {

  })

  it('should update state with attachState', done => {
    let lastSetstate
    const organism = () => {
      let [state, setState] = attachState(defaultProps.initState)
      expect(!lastSetstate || lastSetstate === setState).toEqual(true)
      lastSetstate = setState
      return state
    }

    let checkExpectation = () => {
      expect(mockFn.mock.calls).toEqual([
        [defaultProps.initState],
        [defaultProps.initState],
        [defaultProps.delayState],
      ])
      done()
    }

    let count = 0
    live(organism, 1).onExcrete(r => {
      mockFn(r)
      if (3 === ++count) {
        checkExpectation()
      }
    })
    setTimeout(() => lastSetstate && lastSetstate(defaultProps.delayState))
    live(organism, 2)
  })

  it('should always get permanent unique ref from attachRef', () => {
    let lastARef
    const organism = () => {
      let aRef = attachRef()
      expect(!lastARef || lastARef === aRef).toEqual(true)
      lastARef = aRef

      let bRef = attachRef()
      expect(aRef === bRef).toEqual(false)
    }

    live(organism, 1)
    live(organism, 2)
    live(organism, 3)
  })

  it('should call timeout with attachTimeout', done => {
    const organism = props => {
      let [state, setState] = attachState(props.initState)
      attachTimeout(props.delay, () => setState(props.delayState))
      return state;
    }
  
    let checkExpectation = () => {
      expect(mockFn.mock.calls).toEqual([
        [defaultProps.initState],
        [defaultProps.delayState]
      ]);
      done()
    }

    let count = 0
    live(organism, defaultProps).onExcrete(r => {
      mockFn(r)
      if (2 === ++count) {
        checkExpectation()
      }
    })
  })

  it('should call periodically with attachInterval', done => {
    const organism = props => {
      let [state, setState] = attachState(props.initState)
      attachInterval(props.delay, () => setState(n => n + 1))
      return state;
    }
  
    let checkExpectation = () => {
      expect(mockFn.mock.calls).toEqual([
        [defaultProps.initState],
        [defaultProps.initState + 1],
        [defaultProps.initState + 1 + 1]
      ]);
      done()
    }

    let count = 0
    live(organism, defaultProps).onExcrete(r => {
      mockFn(r)
      if (3 === ++count) {
        checkExpectation()
      }
    })
  })
})
