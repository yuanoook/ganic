const { live } = require('../../Ganic')

const {
  attachState,
  attachTimeout,
  attachInterval
} = require('..')

describe('parasite async function', () => {
  const mockFn = jest.fn()
  const defaultProps = {
    initState: 0,
    delay: 50,
    delayState: 9999
  }

  beforeEach(() => mockFn.mockReset())

  const checkOrganExcretion = (organ, expectation, done) => {
    const checkExpectation = () => {
      expect(mockFn.mock.calls).toEqual(expectation)
      done()
    }

    let count = 0
    organ.onExcrete(r => {
      mockFn(r)
      if (expectation.length === ++count)
        checkExpectation()
    })
  }

  it('should update state with attachState', done => {
    let lastSetstate
    const organism = () => {
      let [state, setState] = attachState(defaultProps.initState)
      lastSetstate = setState
      return state
    }
    const organ = live(organism, 1)
    const expectation = [
      [defaultProps.initState],
      [defaultProps.initState],
      [defaultProps.delayState],
    ]

    checkOrganExcretion(organ, expectation, done)

    setTimeout(() => lastSetstate(defaultProps.delayState))
    live(organism, 2)
  })

  it('should call timeout with attachTimeout', done => {
    const organism = props => {
      const [state, setState] = attachState(props.initState)
      attachTimeout(props.delay, () => setState(props.delayState))
      return state;
    }
    const organ = live(organism, defaultProps)
    const expectation = [
      [defaultProps.initState],
      [defaultProps.delayState]
    ]

    checkOrganExcretion(organ, expectation, done)
  })

  it('should call periodically with attachInterval', done => {
    const organism = props => {
      const [state, setState] = attachState(props.initState)
      attachInterval(props.delay, () => setState(n => n + 1))
      return state
    }
    const organ = live(organism, defaultProps)
    const expectation = [0, 1, 2, 3, 4, 5].map(i => [defaultProps.initState + i])

    checkOrganExcretion(organ, expectation, done)
  })
})
