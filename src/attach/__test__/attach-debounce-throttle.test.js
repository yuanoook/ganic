'use strict';

const {create} = require('../../Ganic');

const {
  useState,
  useInterval,
  useTimeout,

  useDebounce,
  useThrottle,
} = require('..');

const {checkAsyncExpectation} = require('./utils');

describe('useDebounce & useThrottle', () => {
  const mockFn = jest.fn();
  beforeEach(() => mockFn.mockReset());

  it('should debounce state updates', done => {
    const organism = () => {
      const [state, setState] = useState(0);
      const [interval, setInterval] = useState(50);

      // start updating the state every 50ms
      useInterval(() => setState(n => n + 1), interval);

      // stop updating state 110ms later
      // expect there'll be two updates only
      useTimeout(() => setInterval(null), 225);

      // bring debouncedState, 60ms after the last state update
      // expect it will skip two updates, and bring out the final state
      const debouncedState = useDebounce(state, 60);
      return {state, debouncedState, interval};
    };

    const expectation = [
      // 0ms - init
      [{state: 0, debouncedState: 0, interval: 50}],

      // 50ms - skipped the 1st update from useInterval
      [{state: 1, debouncedState: 0, interval: 50}],

      // - skipped 3 more updates
      [{state: 2, debouncedState: 0, interval: 50}],
      [{state: 3, debouncedState: 0, interval: 50}],
      [{state: 4, debouncedState: 0, interval: 50}],

      // 225ms - ignored update from useTimeout, interval timer stoped here
      [{state: 4, debouncedState: 0, interval: null}],

      // 260ms (4 * 50ms + 60ms) - bring out the final state
      [{state: 4, debouncedState: 4, interval: null}],
    ];

    const organ = create({organism});
    checkAsyncExpectation({organ, expectation, done, mockFn});
  });

  it('should throttle state updates', done => {
    const organism = () => {
      const [state, setState] = useState(0);
      useInterval(() => setState(n => n + 1), 50);
      const throttledState = useThrottle(state, 135);
      return {state, throttledState};
    };

    const expectation = [
      // 0ms - init
      [{state: 0, throttledState: 0}],

      // 50ms - 100ms - throttled 2 updates
      [{state: 1, throttledState: 0}],
      [{state: 2, throttledState: 0}],

      // 135ms - brought out the 2nd update
      [{state: 2, throttledState: 2}],

      // 150ms - 250ms - throttled 3 more updates
      [{state: 3, throttledState: 2}],
      [{state: 4, throttledState: 2}],
      [{state: 5, throttledState: 2}],

      // 270ms - brought out the 5th update
      [{state: 5, throttledState: 5}],
    ];

    const organ = create({organism});
    checkAsyncExpectation({organ, expectation, done, mockFn});
  });
});
