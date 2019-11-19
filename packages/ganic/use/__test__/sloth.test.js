/* eslint-disable no-multi-spaces */

const {create} = require('../../Ganic');
const {
  useState,
  useInterval,
  useTimeout,

  useDebounce,
  useThrottle,
} = require('..');
const {checkAsyncExpectation} = require('./utils');
const Lakhesis = require('../../moirai/Lakhesis');

/**
 * WARNING:
 *    This test may not pass,
 *    because setInterval and setTimeout may not be precise due to their design.
 *    Reference
 *      - https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Reasons_for_delays_longer_than_specified
 *
 * TODO:
 *    Figure out a better way to test this
 */

describe('useDebounce & useThrottle', () => {
  const mockFn = jest.fn();
  beforeEach(() => mockFn.mockReset());

  it('should debounce state updates', done => {
    const organism = () => {
      const [state, setState] = useState(0);        // parasite index 0
      const [interval, setInterval] = useState(50); // parasite index 1

      // bring debouncedState, 60ms after the last state update
      // expect it will skip two updates, and bring out the final state
      const debouncedState = useDebounce(state, 60);// parasite index 2

      // start updating the state every 50ms
      useInterval(() => setState(n => n + 1), interval);

      // stop updating state 110ms later
      // expect there'll be two updates only
      useTimeout(() => setInterval(null), 225);

      const givingParasiteIndex = Lakhesis.givingParasite && Lakhesis.givingParasite.index;

      return {state, debouncedState, interval, givingParasiteIndex};
    };

    const expectation = [
      // 0ms - init
      [{state: 0, debouncedState: 0, interval: 50, givingParasiteIndex: null}],

      // 50ms - skipped the 1st update from useInterval
      [{state: 1, debouncedState: 0, interval: 50, givingParasiteIndex: 0}],

      // - skipped 3 more updates
      [{state: 2, debouncedState: 0, interval: 50, givingParasiteIndex: 0}],
      [{state: 3, debouncedState: 0, interval: 50, givingParasiteIndex: 0}],
      [{state: 4, debouncedState: 0, interval: 50, givingParasiteIndex: 0}],

      // 225ms - ignored update from useTimeout, interval timer stoped here
      [{state: 4, debouncedState: 0, interval: null, givingParasiteIndex: 1}],

      // 260ms (4 * 50ms + 60ms) - bring out the final state
      [{state: 4, debouncedState: 4, interval: null, givingParasiteIndex: 2}],
    ];

    const organ = create({organism});
    checkAsyncExpectation({organ, expectation, done, mockFn});
  });

  it('should throttle state updates', done => {
    const organism = () => {
      const [state, setState] = useState(0);          // parasite index 0
      const throttledState = useThrottle(state, 260); // parasite index 1

      useInterval(() => setState(n => n + 1), 100);

      const givingParasiteIndex = Lakhesis.givingParasite && Lakhesis.givingParasite.index;

      return {state, throttledState, givingParasiteIndex};
    };

    const expectation = [
      // 0ms - init
      [{state: 0, throttledState: 0, givingParasiteIndex: null}],

      // 100ms - 200ms - throttled 2 updates
      [{state: 1, throttledState: 0, givingParasiteIndex: 0}],
      [{state: 2, throttledState: 0, givingParasiteIndex: 0}],

      // 260ms - brought out the 2nd update
      [{state: 2, throttledState: 2, givingParasiteIndex: 1}],

      // 300ms - 500ms - throttled 3 more updates
      [{state: 3, throttledState: 2, givingParasiteIndex: 0}],
      [{state: 4, throttledState: 2, givingParasiteIndex: 0}],
      [{state: 5, throttledState: 2, givingParasiteIndex: 0}],

      // 520ms - brought out the 5th update
      [{state: 5, throttledState: 5, givingParasiteIndex: 1}],
    ];

    const organ = create({organism});
    checkAsyncExpectation({organ, expectation, done, mockFn});
  });
});
