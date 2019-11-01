'use strict';

const {live, attach} = require('../../Ganic');

const {
  attachState,
  attachInterval,
  attachTimeout,

  attachDebounce,
  attachThrottle,
} = require('..');

const {checkAsyncExpectation} = require('./utils');

describe('attachDebounce & attachThrottle', () => {
  const mockFn = jest.fn();
  beforeEach(() => mockFn.mockReset());

  it('should debounce state', done => {
    const mockFn = jest.fn();
    const organism = () => {
      const [state, setState] = attachState(0);
      const [interval, setInterval] = attachState(50);

      // start updating the state every 50ms
      attachInterval(() => setState(n => n + 1), interval);

      // stop updating state 110ms later
      // expect there'll be two updates only
      attachTimeout(() => setInterval(0), 110);

      // bring debouncedState, 60ms after the last state update
      // expect it will skip two updates, and bring out the final state
      const debouncedState = attachDebounce(state, 60);
      return {state, debouncedState, interval};
    }

    const expectation = [
      // 0ms - init
      [{state: 0, debouncedState: 0, interval: 50}],

      // 50ms - skiped the 1st update from attachInterval
      [{state: 1, debouncedState: 0, interval: 50}],

      // 100ms - skiped the 2nd update from attachInterval
      [{state: 2, debouncedState: 0, interval: 50}],

      // 110ms - ignored update from attachTimout, interval timer stoped here
      [{state: 2, debouncedState: 0, interval: 0}],

      // 160ms (50ms + 50ms + 60ms) - bring out the final state
      [{state: 2, debouncedState: 2, interval: 0}],
    ];

    const organ = live(organism);
    checkAsyncExpectation({organ, expectation, done, mockFn});
  });
});
