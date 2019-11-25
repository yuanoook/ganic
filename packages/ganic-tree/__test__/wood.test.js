const {
  getTrees,
  addTree,
  getTreeByRoot,
  removeTree,
  clear,
} = require('../lab/wood');

const { render } = require('../index');

describe('wood', () => {
  it('should addTree, removeTree properly', () => {
    const a = {envRoot: 1};
    const b = {envRoot: 2};
    const c = {envRoot: 3};
    addTree(a);
    expect(getTrees()[0]).toBe(a);

    addTree(b);
    expect(getTrees()[1]).toBe(b);
    expect(getTreeByRoot(2)).toBe(b);

    addTree(c);
    expect(getTrees()[2]).toBe(c);

    removeTree(b);
    expect(getTrees().length).toBe(2);
    expect(getTrees()[1]).toBe(c);

    expect(getTrees()).toEqual([a, c]);
    clear();
    expect(getTrees()).toEqual([]);
    expect(getTreeByRoot(2)).toBe(undefined);
  });

  it('should addTree, removeTree with OrganTree properly', () => {
    const a = render({envRoot: 1});
    const b = render({envRoot: 2});
    const c = render({envRoot: 3});
    const d = render({envRoot: 2});
    expect(getTrees()[0]).toBe(a);

    expect(getTrees()[1]).toBe(b);
    expect(d).toBe(b);
    expect(getTreeByRoot(2)).toBe(b);

    expect(getTrees()[2]).toBe(c);

    b.vanish();
    expect(getTrees().length).toBe(2);
    expect(getTrees()[1]).toBe(c);

    const e = render({envRoot: 2});
    expect(e).not.toBe(b);
    expect(getTreeByRoot(2)).toBe(e);
    expect(getTreeByRoot(2)).not.toBe(b);

    expect(getTrees()).toEqual([a, c, e]);
    clear();
    expect(getTrees()).toEqual([]);
    expect(getTreeByRoot(2)).toBe(undefined);

  });
});
