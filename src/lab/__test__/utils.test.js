'use strict';

const {flat} = require('../utils');

describe('lab utils', () => {
  it('should flat array properly', () => {
    expect(flat([1], Infinity)).toEqual([1]);
    expect(flat([[1]], Infinity)).toEqual([1]);
    expect(flat([[[1]]], Infinity)).toEqual([1]);
    expect(flat([[[1], 1], 1], Infinity)).toEqual([1, 1, 1]);

    expect(flat([1])).toEqual([1]);
    expect(flat([[1]])).toEqual([1]);
    expect(flat([[[1]]])).toEqual([[1]]);
    expect(flat([[[1], 1], 1])).toEqual([[1], 1, 1]);
  });
});
