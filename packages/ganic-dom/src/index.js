
const { getOrganismByTag } = require('./organism');
const { setUpNode, relocate } = require('./connect/node');
const { updateLeaf, vanishLeaf } = require('./connect/leaf');

const getTagkit = tagName => {
  return {
    organism: getOrganismByTag(tagName),
    onReady: node => {
      // TODO: domDesc.parent = parentTagNode.domDesc
      setUpNode(node);
    },
  };
};

const onSettled = () => {
  // TODO: batch clearing job
};

module.exports = {
  getTagkit,

  updateLeaf,
  vanishLeaf,

  onSettled,
  relocate,
};
