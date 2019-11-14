'use strict';

const { insertDom } = require('./utils');
const { organDomMap } = require('./map');

const setUpNode = node => {
  const dom = organDomMap.get(node.organ);
  insertDom(dom, node);
};

module.exports = {
  setUpNode,
};
