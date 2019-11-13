'use strict';

const Ganic = require('../../../index');
const {render, useState, useRef, useMemo} = Ganic;

describe('should always keep identity from parasite', () => {
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

  it('should get ref.current by useRef properly', () => {
    const envRoot = document.createElement('div');
    const App = () => {
      const inputRef = useRef();
      const [count, setCount] = useState(1);
      const onButtonClick = () => {
        setCount(n => n + 1);
        inputRef.current.focus();
      };
      return <>
        <input ref={inputRef} value={count} />
        <button onClick={onButtonClick}>{count}</button>
      </>;
    };
    const tree = render({organDesc: <App />, envRoot});

    expect(envRoot.innerHTML).toBe('<input value="1"><button>1</button>');
    expect(envRoot.textContent).toBe('1');

    envRoot.querySelector('button').dispatchEvent(new MouseEvent('click'));
    expect(document.activeElement.tagName).toBe('INPUT');
    expect(envRoot.querySelector('input') === document.activeElement).toBe(true);

    expect(envRoot.innerHTML).toBe('<input value="2"><button>2</button>');
    expect(envRoot.textContent).toBe('2');

    tree.vanish();
    expect(envRoot.textContent).toBe('');
  });

  it('should keep the same dom ref.current with the same key', () => {
    const envRoot = document.createElement('div');
    let lastInput = null;
    const App = () => {
      const [count, setCount] = useState(1);
      const onButtonClick = () => setCount(n => n + 1);
      return <>
        <input ref={el => {
          if (lastInput) {
            expect(lastInput).toBe(el);
          }
          lastInput = el;
        }}/>
        <button onClick={onButtonClick}>{count}</button>
      </>;
    };

    const tree = render({organDesc: <App />, envRoot});
    const input = envRoot.querySelector('input');
    envRoot.querySelector('button').dispatchEvent(new MouseEvent('click'));
    expect(envRoot.querySelector('input')).toBe(input);
    tree.vanish();
  });

  it('should add event, call the same ref only once', () => {
    const mockFn = jest.fn();
    const envRoot = document.createElement('div');
    const App = () => {
      const [count, setCount] = useState(1);
      const onButtonClick = () => setCount(n => n + 1);

      const inputRef = useMemo(() => {
        const fn = value => {
          mockFn();
          fn.current = value;
        };
        fn.current = null;
        return fn;
      });

      return <>
        <input ref={inputRef} value={count}/>
        <button onClick={onButtonClick}>{count}</button>
      </>;
    };

    const tree = render({organDesc: <App />, envRoot});
    expect(mockFn.mock.calls.length).toBe(1);
    expect(envRoot.textContent).toBe('1');

    envRoot.querySelector('button').dispatchEvent(new MouseEvent('click'));
    expect(mockFn.mock.calls.length).toBe(1);
    expect(envRoot.textContent).toBe('2');

    envRoot.querySelector('button').dispatchEvent(new MouseEvent('click'));
    expect(mockFn.mock.calls.length).toBe(1);
    expect(envRoot.textContent).toBe('3');
    tree.vanish();
  });
});
