'use strict';

const {create} = require('../../Ganic');
const {useState, useTimeout, useInterval} = require('..');
const {checkAsyncExpectation} = require('./utils');

describe('parasite async function', () => {
  const mockFn = jest.fn();
  const defaultProps = {
    initState: 0,
    delay: 50,
    delayState: 9999,
  };

  beforeEach(() => mockFn.mockReset());

  it('should update state with useState', done => {
    let lastSetstate;
    const organism = () => {
      let [state, setState] = useState(defaultProps.initState);
      lastSetstate = setState;
      return state;
    };
    const organ = create({organism, props: 1});
    const expectation = [
      [defaultProps.initState],
      [defaultProps.initState],
      [defaultProps.delayState],
    ];

    checkAsyncExpectation({organ, expectation, done, mockFn});

    setTimeout(() => lastSetstate(defaultProps.delayState));
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
});
