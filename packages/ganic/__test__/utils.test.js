const { shallowEqual } = require('../lab/utils');
const { getAllTimeout } = require('./utils');

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
  });

  it('should call done after all time out or cleared', done => {
    const mockFn = jest.fn();
    const {setTimeout, clearTimeout} = getAllTimeout(() => {
      expect(mockFn.mock.calls).toEqual([
        [1],
        [4],
      ]);
      done();
    });
    const addTimeout = fn => setTimeout(() => fn && fn(), 50);

    addTimeout(() => mockFn(1));
    clearTimeout(addTimeout(() => mockFn(2)));
    clearTimeout(addTimeout(() => mockFn(3)));
    addTimeout(() => mockFn(4));
    clearTimeout(addTimeout(() => mockFn(5)));
  });
});
