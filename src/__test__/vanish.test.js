'use strict';

const {create, attach} = require('../Ganic');
const {ASYNC_GIVE_AFTER_DETACH_ERROR_MESSAGE} = require('../Parasite');
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

  // TODO: test LEAVE_HANDOVER_AT_THE_ENDING
});
