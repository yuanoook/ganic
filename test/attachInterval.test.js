const { take, live } = require('../src/ganic');

test('attach  rightly', done => {
  const mockFn = jest.fn()

  const intervalParasitism = ({delay}, give) => {
    if (!delay) return
    let timer = setInterval(() => {
      give(num => {
        return num + 1
      });
    }, delay)
    mockFn('attach: ', delay)
    return () => {
      mockFn('detach: ', delay)
      clearInterval(timer);
    }
  }

  const intervalOrganism = props => {
    let c = take(props).attach(intervalParasitism).firstGive(0)
    let d = take().attach({da: 1}).firstGive()
    return `${c} ${JSON.stringify(d)}`;
  }

  const props = {
    delay: 200
  }

  live(intervalOrganism, props).onExcrete(r => {
    mockFn('ex: ', r)
  })

  setTimeout(() => {
    expect(mockFn.mock.calls).toEqual([
      ['attach: ', props.delay],
      ['ex: ', '0 {"da":1}'],
      ['ex: ', '1 {"da":1}'],
    ])
    done()
  }, props.delay)
});