'use strict';

const {
  shallowEqual,
  flat,
} = require('../utils');

describe('lab utils', () => {
  it('shallowEqual', () => {
    expect(shallowEqual({}, {})).toBe(true);
    expect(shallowEqual(null, null)).toBe(true);
    expect(shallowEqual(undefined, undefined)).toBe(true);
    expect(shallowEqual(null, undefined)).toBe(true);
    expect(shallowEqual([], [])).toBe(true);
    expect(shallowEqual({a: 1}, {a: 1})).toBe(true);

    const b = {};
    expect(shallowEqual({a: b}, {a: b})).toBe(true);

    expect(shallowEqual({a: 1}, {a: 2})).toBe(false);
    expect(shallowEqual({a: {}}, {a: {}})).toBe(false);
    expect(shallowEqual({a: b}, {a: {}})).toBe(false);
  });

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
