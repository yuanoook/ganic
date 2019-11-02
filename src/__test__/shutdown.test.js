'use strict';

const {create, attach} = require('../Ganic');
const {useEffect} = require('../use');
const {ASYNC_GIVE_AFTER_DETACH_ERROR_MESSAGE} = require('../Parasite');

describe('shutdown', () => {
  it('should throw Error when call give after detach', () => {
    try {
      throw new Error(ASYNC_GIVE_AFTER_DETACH_ERROR_MESSAGE)
    } catch (e) {
      expect(e.message).toBe(ASYNC_GIVE_AFTER_DETACH_ERROR_MESSAGE);
    }
  });
});
