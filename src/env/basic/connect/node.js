'use strict';

const { findEnvParent } = require('./utils');
const { organDomMap } = require('./map');

const setUpNode = organNode => {
  const parentDom = findEnvParent(organNode);
  const dom = organDomMap.get(organNode.organ);
  if (dom) {
    parentDom.appendChild(dom);
  }
};

module.exports = {
  setUpNode,
};
