'use strict';

const { organDomMap } = require('./map');

const findEnvParent = organNode => {
  if (organNode.parent) {
    return organDomMap.get(organNode.parent.organ) || findEnvParent(organNode.parent);
  } else if (organNode.tree) {
    return organNode.tree.envRoot;
  }
  throw new Error(`Cannot find env parent`);
};

module.exports = {
  findEnvParent,
};
