const { getAllTimeout } = require('./utils');

describe('utils functions', () => {
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
