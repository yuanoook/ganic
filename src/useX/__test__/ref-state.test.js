'use strict';

const {create} = require('../../Ganic');

const {useRef, useState} = require('..');

describe('should always keep identity from parasite', () => {
  it('should always get permanent unique setState from useState', () => {
    let lastSetA;
    const organism = () => {
      const [, setA] = useState();
      expect(!lastSetA || lastSetA === setA).toEqual(true);
      lastSetA = setA;

      const [, setB] = useState();
      expect(setA === setB).toEqual(false);
    };

    create({organism, props: 1}).receive(2).receive(3);
  });

  it('should always get permanent unique ref from useRef', () => {
    let lastARef;
    const organism = () => {
      const aRef = useRef();
      expect(!lastARef || lastARef === aRef).toEqual(true);
      lastARef = aRef;

      const bRef = useRef();
      expect(aRef === bRef).toEqual(false);
    };

    create({organism, props: 1}).receive(2).receive(3);
  });
});
