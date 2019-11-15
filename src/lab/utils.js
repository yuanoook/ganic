'use strict';

const List = props => props;

const shallowEqual = (a, b) => {
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') {
    return a === b || (a === undefined && b === null) || (a === null && b === undefined);
  }
  return a === b || !Object.keys(Object.assign({}, a, b)).find(key => a[key] !== b[key]);
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

module.exports = {
  shallowEqual,
  List,
  getUtilsByDesc,
  createNode,
};
