const shallowEqual = require('./shallowEqual');

describe('utils functions', () => {
  it('shallowEqual', () => {
    expect(shallowEqual({}, {})).toBe(true);
    expect(shallowEqual(null, null)).toBe(true);
    expect(shallowEqual(undefined, undefined)).toBe(true);
    expect(shallowEqual([], [])).toBe(true);
    expect(shallowEqual({a: 1}, {a: 1})).toBe(true);

    const b = {};
    expect(shallowEqual({a: b}, {a: b})).toBe(true);

    expect(shallowEqual({a: 1}, {a: 2})).toBe(false);
    expect(shallowEqual({a: {}}, {a: {}})).toBe(false);
    expect(shallowEqual({a: b}, {a: {}})).toBe(false);

    expect(shallowEqual(new Date(1), new Date(1))).toBe(true);
    expect(shallowEqual(new Date(1), new Date(0))).toBe(false);
    expect(shallowEqual(new Date(1), {})).toBe(false);
    expect(shallowEqual(new Date(1), 1)).toBe(false);
  });
});
