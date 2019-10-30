const { take, live } = require('../src/ganic');

test('should attach & detach properly', () => {
  const mockFn = jest.fn()

  const parasitism = deps => {
    mockFn('attach', deps)
    return () => mockFn('detach', deps)
  }

  const organism = props => {
    return take(props).attach(parasitism).firstGive()
  }

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
