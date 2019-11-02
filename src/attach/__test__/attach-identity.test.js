'use strict';

const {live} = require('../../Ganic');

const {attachRef, attachState} = require('..');

describe('should always keep identity from parasite', () => {
  it('should always get permanent unique setState from attachState', () => {
    let lastSetA;
    const organism = () => {
      const [, setA] = attachState();
      expect(!lastSetA || lastSetA === setA).toEqual(true);
      lastSetA = setA;

      const [, setB] = attachState();
      expect(setA === setB).toEqual(false);
    };

    live({organism, props: 1}).receive(2).receive(3);
  });

  it('should always get permanent unique ref from attachRef', () => {
    let lastARef;
    const organism = () => {
      const aRef = attachRef();
      expect(!lastARef || lastARef === aRef).toEqual(true);
      lastARef = aRef;

      const bRef = attachRef();
      expect(aRef === bRef).toEqual(false);
    };

    live({organism, props: 1}).receive(2).receive(3);
  });
});
