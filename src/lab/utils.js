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
  key,
  relationship,
}) => {
  let { organism, onReady } = getUtilsByDesc(desc, tree) || {};
  let node;
  if (organism) {
    node = new OrganNode({
      organ: new Organ({organism, props: desc.props}),
      parent,
      tree,
      key,
      relationship,
    });
  } else {
    node = new OrganLeaf({
      value: desc,
      parent,
      tree,
      key,
      relationship,
    });
    onReady = () => node.update();
  }
  return {node, onReady};
};

// TODO: make a class treeNode, let OrganNode/OrganLeaf extend it
const buildRelationship = (node, {parent, isFirst, isLast, preSibling} = {}) => {
  node.preSibling = preSibling || null;
  if (preSibling) {
    node.nextSibling = preSibling.nextSibling;
    preSibling.nextSibling = node;
    if (node.nextSibling) {
      node.nextSibling.preSibling = node;
    }
  }
  if (parent) {
    parent.children[node.key] = node;
    if (isFirst) {
      node.parent.firstChild = node;
    }
    if (isLast) {
      node.parent.lastChild = node;
    }
  }
};

const vanishRelationship = node => {
  if (node.preSibling) {
    node.preSibling.nextSibling = node.nextSibling;
  }
  if (node.nextSibling) {
    node.nextSibling.preSibling = node.preSibling;
  }

  if (!node.parent) {
    return;
  }

  if (node.parent.firstChild === node) {
    node.parent.firstChild = node.nextSibling;
  }
  if (node.parent.lastChild === node) {
    node.parent.lastChild = node.preSibling;
  }
  if (node.parent.children[node.key] === node) {
    delete node.parent.children[node.key];
  }
};

module.exports = {
  shallowEqual,
  flat,
  getUtilsByDesc,
  createNode,
  buildRelationship,
  vanishRelationship,
};
