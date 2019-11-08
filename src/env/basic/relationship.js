'use strict';

const { organDomMap } = require('./map');

const findEnvParent = node => {
  if (node.parent) {
    return organDomMap.get(node.parent.organ) || findEnvParent(node.parent);
  } else if (node.tree) {
    return node.tree.envRoot;
  }
  throw new Error(`Cannot find env parent`);
};

module.exports = {
  findEnvParent,
};
