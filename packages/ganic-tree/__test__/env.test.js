const Ganic = require('ganic');
const {useState, useTimeout} = require('ganic-usex');
const {render} = require('../index');
const nullEnv = require('../env');

describe('basic envRunner', () => {
  it('should call onSettled properly', () => {
    let organ1, organ2;
    const mockFn3 = jest.fn();
    const mockFn2 = jest.fn();
    const mockFn1 = jest.fn();
    const onSettled = jest.fn();
    const envRoot = document.createElement('div');

    const App3 = ({count}) => {
      mockFn3();
      return count;
    };

    const App2 = ({count}) => {
      organ2 = Ganic.getUpdatingOrgan();
      const [count2, setCount2] = useState(1);
      useTimeout(() => {
        setCount2(2);
        expect(onSettled.mock.calls.length).toBe(2);
        expect(onSettled.mock.calls[1].organ).toBe(organ2);

        expect(mockFn1.mock.calls.length).toBe(2);
        expect(mockFn2.mock.calls.length).toBe(3);
        expect(mockFn3.mock.calls.length).toBe(3);
      }, 30);
      mockFn2();
      return <App3 count={count + count2}/>;
    };

    const App = () => {
      organ1 = Ganic.getUpdatingOrgan();
      const [count, setCount] = useState(1);
      useTimeout(() => {
        setCount(2);
        expect(onSettled.mock.calls.length).toBe(1);
        expect(onSettled.mock.calls[0].organ).toBe(organ1);

        expect(mockFn1.mock.calls.length).toBe(2);
        expect(mockFn2.mock.calls.length).toBe(2);
        expect(mockFn3.mock.calls.length).toBe(2);
      }, 1);
      mockFn1();
      return <App2 count={count}/>;
    };

    const envRunner = {...nullEnv, onSettled};
    const tree = render({organDesc: <App/>, envRoot, envRunner});

    tree.vanish();
  });
});
