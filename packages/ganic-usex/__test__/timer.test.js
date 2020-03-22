const {create} = require('ganic');
const {useState, useTimeout, useInterval} = require('../index');
const {checkAsyncExpectation} = require('./utils');
const shallowEqual = require('../../shared/shallowEqual');

describe('parasite async function', () => {
  const mockFn = jest.fn();
  const defaultProps = {
    initState: 0,
    delay: 50,
    delayState: 9999,
  };

  beforeEach(() => mockFn.mockReset());

  it('should update state with useState', done => {
    let lastSetState;
    const organism = props => {
      let [state, setState] = useState(defaultProps.initState);
      lastSetState = setState;
      return [state, props];
    };
    const organ = create({organism, props: 1});
    const expectation = [
      [[defaultProps.initState, 1]],
      [[defaultProps.initState, 2]],
      [[defaultProps.delayState, 2]],
    ];

    checkAsyncExpectation({organ, expectation, done, mockFn});

    setTimeout(() => lastSetState(defaultProps.delayState));
    organ.receive(2);
  });

  it('should call timeout with useTimeout', done => {
    const organism = props => {
      const [state, setState] = useState(props.initState);
      useTimeout(() => setState(props.delayState), props.delay);
      return state;
    };
    const organ = create({organism, props: defaultProps});
    const expectation = [[defaultProps.initState], [defaultProps.delayState]];

    checkAsyncExpectation({organ, expectation, done, mockFn});
  });

  it('should call periodically with useInterval', done => {
    const organism = props => {
      const [state, setState] = useState(props.initState);
      useInterval(() => setState(n => n + 1), props.delay);
      return state;
    };
    const organ = create({organism, props: defaultProps});
    const expectation = [0, 1, 2, 3, 4, 5].map(i => [
      defaultProps.initState + i,
    ]);

    checkAsyncExpectation({organ, expectation, done, mockFn});
  });

  it('should not update while parasite asyncGive provide shallowEqual value', done => {
    let prevState;
    const organism = props => {
      const [state, setState] = useState(props.initState);
      expect(shallowEqual(prevState, state)).toBe(false);
      prevState = state;
      // set state to {a: 1} frequently
      useInterval(() => setState({a: 1}), 0);
      // set state to 2 for once
      useTimeout(() => setState(2), 50);
      return state;
    };
    const organ = create({organism, props: defaultProps});
    const expectation = [
      [defaultProps.initState], // init
      [{a: 1}], // setState(1) multiple times in useInterval
      [2], // setState(2) once in useTimeout
      [{a: 1}], // setState(1) once in useInterval
    ];

    checkAsyncExpectation({organ, expectation, done, mockFn});
  });

});
