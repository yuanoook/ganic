const { take, live } = require('../src/ganic')

const {
  attachEffect
} = require('../src/attach')

describe('parasite attach & detach', () => {
  const mockFn = jest.fn()
  beforeEach(() => mockFn.mockReset())

  it('should attach & detach properly', () => {
    const parasitism = deps => {
      mockFn('attach', deps)
      return () => mockFn('detach', deps)
    }
    const organism = props => take(props).attach(parasitism).firstGive()
    const randoms = [0, 1, 2].map(() => Math.random())

    randoms.forEach(
      random => live(organism, random)
    )
  
    expect(mockFn.mock.calls).toEqual([
      ['attach', randoms[0]],
      ['detach', randoms[0]],
      ['attach', randoms[1]],
      ['detach', randoms[1]],
      ['attach', randoms[2]]
    ])
  })

  it('should attach & detach properly with useEffect without deps', () => {
    const parasitism = deps => {
      mockFn('attach', deps)
      return () => mockFn('detach', deps)
    }
    const organism = () => attachEffect(parasitism)

    ;[0, 1, 2].forEach(
      () => live(organism, Math.random())
    )
  
    expect(mockFn.mock.calls).toEqual([
      ['attach', undefined],
      ['detach', undefined],
      ['attach', undefined],
      ['detach', undefined],
      ['attach', undefined]
    ])
  })

  it('should attach & detach properly with useEffect with random deps', () => {
    const parasitism = deps => {
      mockFn('attach', deps)
      return () => mockFn('detach', deps)
    }
    const organism = props => attachEffect(parasitism, props)
    const randoms = [0, 1, 2].map(() => Math.random())

    randoms.forEach(
      random => live(organism, random)
    )
  
    expect(mockFn.mock.calls).toEqual([
      ['attach', randoms[0]],
      ['detach', randoms[0]],
      ['attach', randoms[1]],
      ['detach', randoms[1]],
      ['attach', randoms[2]]
    ])
  })

  it('should attach & detach properly with useEffect with random deps', () => {
    const parasitism = deps => {
      mockFn('attach', deps)
      return () => mockFn('detach', deps)
    }

    const organism = props => attachEffect(parasitism, props)
    const depsList = [0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2]

    depsList.forEach(
      deps => live(organism, deps)
    )
  
    expect(mockFn.mock.calls).toEqual([
      ['attach', 0],
      ['detach', 0],
      ['attach', 1],
      ['detach', 1],
      ['attach', 2]
    ])
  })

})
