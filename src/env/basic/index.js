'use strict';

const { getOrganismByTag } = require('./organism');
const { setUpNode } = require('./connect/node');
const { updateLeaf, vanishLeaf } = require('./connect/leaf');

const getTagUtils = tagName => {
  return {
    organism: getOrganismByTag(tagName),
    onReady: node => {
      // TODO: domDesc.parent = parentTagNode.domDesc
      setUpNode(node);
    },
  };
};

const onUpdated = () => {
  // TODO: batch clearing job
};

module.exports = {
  getTagUtils,
  onUpdated,
  updateLeaf,
  vanishLeaf,
};
