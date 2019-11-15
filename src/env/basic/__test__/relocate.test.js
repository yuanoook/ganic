'use strict';

const Ganic = require('../../../index');
const {render, useState, useMemo} = Ganic;

describe('relocate', () => {
  it('should affect minimum siblings during relocation', () => {
    const mockFn = jest.fn();
    const envRoot = document.createElement('div');
    const App = () => {
      const [count, setCount] = useState(1);
      const plus = useMemo(() => () => setCount(n => n + 1));
      const numbers = new Array(count).join(",").split(",").map((x, i) => i);
      const list = numbers.reverse().map(i => <i key={i}>{i}</i>);

      return (
        <>
          {list}
          <button onClick={plus}>-1</button>
        </>
      );
    };
    const tree = render({organDesc: <App/>, envRoot});
    const originalInsertBefore = envRoot.insertBefore.bind(envRoot);
    envRoot.insertBefore = (...args) => {
      mockFn();
      originalInsertBefore(...args);
    };
    const plusOne = () => envRoot.querySelector('button').dispatchEvent(new MouseEvent('click'));

    plusOne();
    expect(mockFn.mock.calls.length).toBe(1);

    tree.vanish();
  });
});
