const { take, live } = require('../src/ganic');

test('attach  rightly', () => {
  const mockFn = jest.fn()

  const intervalParasitism = (deps, give) => {
    let delay = deps.delay
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

  const sync = x => x;
  const intervalOrganism = props => {
    let a = sync(props.a)
    let b = sync(props.b)
    let c = take(props.c).attach(intervalParasitism).firstGive(0)
    let d = take().attach({da: 1}).firstGive()
    return `${a} ${b} ${c} ${JSON.stringify(d)}`;
  }

  let initProps = {
    a: 1,
    b: 2,
    c: {
      delay: 1000
    }
  }

  live(intervalOrganism, initProps).onExcrete(r => {
    console.log('ex: ', r)
  })

  expect(mockFn.mock.calls).toEqual([
    ['attach: ', 1000]
  ]);
});