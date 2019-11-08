'use strict';

const { getOrganismByTag } = require('./organism');
const { setUpNode } = require('./connect/node');
const { updateLeaf, removeLeaf } = require('./connect/leaf');

module.exports = {
  getOrganismByTag,
  setUpNode,
  updateLeaf,
  removeLeaf,
};
