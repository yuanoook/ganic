'use strict';

const shallowEqual = (a, b) => {
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') {
    return a === b || (a === undefined && b === null) || (a === null && b === undefined);
  }
  return a === b || !Object.keys(Object.assign({}, a, b)).find(key => a[key] !== b[key]);
};

const flat = (array, depth) => {
  if (array.flat) {
    return array.flat(depth);
  }
  depth = isNaN(depth) ? 1 : Number(depth);
  return depth ? array.reduce(function (acc, cur) {
    if (Array.isArray(cur)) {
      acc.push.apply(acc, flat(cur, depth - 1));
    } else {
      acc.push(cur);
    }
    return acc;
  }, []) : Array.prototype.slice.call(array);
};

const getUtilsByDesc = ({ organism } = {}, tree) => {
  if (typeof organism === 'function') {
    return { organism };
  }
  if (tree && typeof organism === 'string') {
    return tree.envUtils.getTagUtils(organism);
  }
};

const createNode = ({
  constructors: {
    Organ,
    OrganNode,
    OrganLeaf,
  },
  desc,
  tree,
  parent,
}) => {
  const { organism, onReady } = getUtilsByDesc(desc, tree) || {};
  const node = organism
    ? new OrganNode({
        organ: new Organ({organism, props: desc.props}),
        parent,
        tree,
      })
    : new OrganLeaf({value: desc, parent, tree});
  return {node, onReady};
};

module.exports = {
  shallowEqual,
  flat,
  getUtilsByDesc,
  createNode,
};
