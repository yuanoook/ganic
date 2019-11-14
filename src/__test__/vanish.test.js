'use strict';

const Ganic = require('../index');
const {create, attach} = Ganic;

const {ASYNC_GIVE_AFTER_DETACH_ERROR_MESSAGE, LEAVE_HANDOVER_AT_THE_ENDING} = require('../lab/Parasite');
const {getAllTimeout} = require('./utils');

describe('vanish', () => {
  it('should throw Error when call give after detach', done => {
    const catchErrorMockFn = jest.fn();
    const {setTimeout, clearTimeout} = getAllTimeout(() => {
      expect(catchErrorMockFn.mock.calls).toEqual([
        [ASYNC_GIVE_AFTER_DETACH_ERROR_MESSAGE],
      ]);
      done();
    });

    // this parasitism is bad, we forget to clearTimeout
    const badParasitism = (deps, give) => setTimeout(() => {
      try {
        give();
      } catch (e) {
        catchErrorMockFn(e.message);
      }
    });
    const badOrganism = () => attach(badParasitism);
    create({organism: badOrganism}).vanish();

    // this parasitism is good, we do clearTimeout here
    const goodParasitism = (deps, give) => {
      const timer = setTimeout(give);
      // set up the right detach function, do our clean job here
      return () => clearTimeout(timer);
    };
    const goodOrganism = () => attach(goodParasitism);
    // we can vanish this safely :D
    create({organism: goodOrganism}).vanish();
  });

  it('should throw Error when leave handover at the ending', () => {
    const catchErrorMockFn = jest.fn();
    const badParasitism = () => () => 1;
    const App = () => attach(badParasitism);
    try {
      create(<App/>).vanish();
    } catch (e) {
      catchErrorMockFn(e.message);
    }
    expect(catchErrorMockFn.mock.calls).toEqual([
      [LEAVE_HANDOVER_AT_THE_ENDING],
    ]);
  });
});
