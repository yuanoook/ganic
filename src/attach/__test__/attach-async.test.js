'use strict';

const {live} = require('../../Ganic');

const {attachState, attachTimeout, attachInterval} = require('..');

const {checkAsyncExpectation} = require('./utils');

describe('parasite async function', () => {
  const mockFn = jest.fn();
  const defaultProps = {
    initState: 0,
    delay: 50,
    delayState: 9999,
  };

  beforeEach(() => mockFn.mockReset());

  it('should update state with attachState', done => {
    let lastSetstate;
    const organism = () => {
      let [state, setState] = attachState(defaultProps.initState);
      lastSetstate = setState;
      return state;
    };
    const organ = live(organism, 1);
    const expectation = [
      [defaultProps.initState],
      [defaultProps.initState],
      [defaultProps.delayState],
    ];

    checkAsyncExpectation({organ, expectation, done, mockFn});

    setTimeout(() => lastSetstate(defaultProps.delayState));
    organ.receive(2);
  });

  it('should call timeout with attachTimeout', done => {
    const organism = props => {
      const [state, setState] = attachState(props.initState);
      attachTimeout(() => setState(props.delayState), props.delay);
      return state;
    };
    const organ = live(organism, defaultProps);
    const expectation = [[defaultProps.initState], [defaultProps.delayState]];

    checkAsyncExpectation({organ, expectation, done, mockFn});
  });

  it('should call periodically with attachInterval', done => {
    const organism = props => {
      const [state, setState] = attachState(props.initState);
      attachInterval(() => setState(n => n + 1), props.delay);
      return state;
    };
    const organ = live(organism, defaultProps);
    const expectation = [0, 1, 2, 3, 4, 5].map(i => [
      defaultProps.initState + i,
    ]);

    checkAsyncExpectation({organ, expectation, done, mockFn});
  });
});
