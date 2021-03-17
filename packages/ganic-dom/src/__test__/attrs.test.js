const Ganic = require('ganic');
const {useState, useRef, useMemo} = require('ganic-usex');
const {render} = require('../../index');

describe('basic attrs', () => {
  it('should handle onClick event properly', () => {
    const envRoot = document.createElement('div');
    const App = () => {
      const [count, setCount] = useState(1);
      return <button onClick={() => setCount(n => n + 1)}>{count}</button>;
    };
    const tree = render(<App />, envRoot);

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
      };
      return <>
        <input ref={inputRef} ivalue={count} />
        <button onClick={onButtonClick}>{count}</button>
      </>;
    };
    const tree = render(<App />, envRoot);

    expect(envRoot.innerHTML).toBe('<input ivalue="1"><button>1</button>');
    expect(envRoot.textContent).toBe('1');

    envRoot.querySelector('button').dispatchEvent(new MouseEvent('click'));
    expect(envRoot.innerHTML).toBe('<input ivalue="2"><button>2</button>');
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

    const tree = render(<App />, envRoot);
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
        <input ref={inputRef} ivalue={count}/>
        <button onClick={onButtonClick}>{count}</button>
      </>;
    };

    const tree = render(<App />, envRoot);
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

  it('should keep the same key-ed input with dynamic elements before', () => {
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
      const numbers = new Array(count).join(',').split(',').map((x, i) => i);
      const list = numbers.map(i => <span>{i}</span>);

      return <>
        { numbers }
        { list }
        <input ref={inputRef} ivalue={count} key="input"/>
        <button onClick={onButtonClick}/>
      </>;
    };

    const tree = render(<App />, envRoot);
    expect(mockFn.mock.calls.length).toBe(1);
    expect(envRoot.innerHTML).toBe('0<span>0</span><input ivalue="1"><button></button>');

    envRoot.querySelector('button').dispatchEvent(new MouseEvent('click'));
    expect(mockFn.mock.calls.length).toBe(1);
    expect(envRoot.innerHTML).toBe('01<span>0</span><span>1</span><input ivalue="2"><button></button>');

    envRoot.querySelector('button').dispatchEvent(new MouseEvent('click'));
    expect(mockFn.mock.calls.length).toBe(1);
    expect(envRoot.innerHTML).toBe('012<span>0</span><span>1</span><span>2</span><input ivalue="3"><button></button>');

    tree.vanish();
  });

  it('should keep the same input with key', () => {
    const mockFn = jest.fn();
    const envRoot = document.createElement('div');
    const App = () => {
      const [count, setCount] = useState(1);
      const onButtonClick = () => setCount(n => n + 1);
      const inputRefs = [useMemo(() => {
        const fn = value => {
          mockFn();
          fn.current = value;
        };
        fn.current = null;
        return fn;
      }), useMemo(() => {
        const fn = value => {
          mockFn();
          fn.current = value;
        };
        fn.current = null;
        return fn;
      })];
      const numbers = new Array(count).join(',').split(',').map((x, i) => i);
      const list = numbers.map(i => <span>{i}</span>);
      const switchIndexs = [(list.length + 1) % 2, list.length % 2];

      return <>
        { numbers }
        <input ref={inputRefs[switchIndexs[0]]} ivalue={switchIndexs[0]} key={`input-${switchIndexs[0]}`}/>
        { list }
        <input ref={inputRefs[switchIndexs[1]]} ivalue={switchIndexs[1]} key={`input-${switchIndexs[1]}`}/>
        <button onClick={onButtonClick}/>
      </>;
    };

    const tree = render(<App />, envRoot);
    expect(mockFn.mock.calls.length).toBe(2);
    expect(envRoot.innerHTML).toBe('0'
      + '<input ivalue="0">'
      + '<span>0</span>'
      + '<input ivalue="1">'
      + '<button></button>',
    );

    envRoot.querySelector('button').dispatchEvent(new MouseEvent('click'));
    expect(mockFn.mock.calls.length).toBe(2);

    expect(envRoot.innerHTML).toBe('01'
      + '<input ivalue="1">'
      + '<span>0</span><span>1</span>'
      + '<input ivalue="0">'
      + '<button></button>',
    );

    envRoot.querySelector('button').dispatchEvent(new MouseEvent('click'));
    expect(mockFn.mock.calls.length).toBe(2);
    expect(envRoot.innerHTML).toBe('012'
      + '<input ivalue="0">'
      + '<span>0</span><span>1</span><span>2</span>'
      + '<input ivalue="1">'
      + '<button></button>',
    );

    tree.vanish();
  });

  it('should accept object for style', () => {
    const envRoot = document.createElement('div');
    const borderWidth = '5px';
    const App = () => <div style={{borderWidth}}/>;
    const tree = render(<App />, envRoot);
    expect(envRoot.firstChild.style.borderBottomWidth).toBe(borderWidth);
    tree.vanish();
  });

  it('should update unchanged style only for once', () => {
    const mockFn = jest.fn();
    const envRoot = document.createElement('div');
    const App = ({n}) => {
      return <div style={{testStyle: n}}/>;
    };
    const tree = render(<App n={1} />, envRoot);
    const appNode = tree.trunkNode.firstChild;

    envRoot.firstChild.style.__defineSetter__('testStyle', mockFn);
    appNode.organ.receive({n: 2});
    expect(mockFn.mock.calls.length).toBe(1);
    appNode.organ.receive({n: 2});
    expect(mockFn.mock.calls.length).toBe(1);
    appNode.organ.receive({n: 3});
    expect(mockFn.mock.calls.length).toBe(2);

    tree.vanish();
  });
});
