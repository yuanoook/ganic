'use strict';

const Ganic = require('../../../index');
const {render, useState} = Ganic;

it('should handle onClick event properly', () => {
  const envRoot = document.createElement('div');
  const App = () => {
    const [count, setCount] = useState(1);
    return <button onClick={() => setCount(n => n + 1)}>{count}</button>;
  };
  const tree = render({organDesc: <App />, envRoot});

  expect(envRoot.innerHTML).toBe('<button>1</button>');
  expect(envRoot.textContent).toBe('1');

  envRoot.querySelector('button').dispatchEvent(new MouseEvent('click'));
  expect(envRoot.textContent).toBe('2');

  tree.vanish();
  expect(envRoot.textContent).toBe('');
});
