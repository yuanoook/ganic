'use strict';

const { getOrganismByTag } = require('./organism');
const { updateLeaf, removeLeaf } = require('./connect/leaf');
const { setUpNode } = require('./connect/node');

module.exports = {
  getOrganismByTag,
  updateLeaf,
  removeLeaf,
  setUpNode,
};
