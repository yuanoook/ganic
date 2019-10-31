const { take, live } = require('../src/Ganic')

const {
  attachEffect
} = require('../src/attach')

describe('parasite attach & detach', () => {
  const mockFn = jest.fn()
  beforeEach(() => mockFn.mockReset())

  const parasitism = deps => {
    mockFn('attach', deps)
    return () => mockFn('detach', deps)
  }
  const attachDetachFlags = ['attach', 'detach']
  const checkAttachDetachExpectation = expectation => {
    const expectationWithFlag = expectation.map(
      (e, i) => [attachDetachFlags[i%2], e]
    )
    expect(mockFn.mock.calls).toEqual(expectationWithFlag)
  }
  const liveCheckWith3Randoms = (organism, expectation) => {
    const randoms = [0, 1, 2].map(() => Math.random())
    randoms.forEach(
      random => live(organism, random)
    )
    const defaultExpectation = [0, 0, 1, 1, 2].map(ri => randoms[ri])
    checkAttachDetachExpectation(expectation || defaultExpectation)
  }

  it('should attach & detach properly', () => {
    const organism = props => take(props).attach(parasitism).firstGive()
    liveCheckWith3Randoms(organism)
  })

  it('should attach & detach properly with useEffect without deps', () => {
    const organism = () => attachEffect(parasitism)
    const expectation = [1, 2, 3, 4, 5]
    liveCheckWith3Randoms(organism, expectation.map(i => undefined))
  })

  it('should attach & detach properly with useEffect with random deps', () => {
    const organism = props => attachEffect(parasitism, props)
    liveCheckWith3Randoms(organism)
  })

  it('should attach & detach properly with useEffect with random deps', () => {
    const organism = props => attachEffect(parasitism, props)
    const depsList = [0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2]
    depsList.forEach(
      deps => live(organism, deps)
    )
    checkAttachDetachExpectation([0, 0, 1, 1, 2])
  })
})
