'use strict';

const { getOrganismByTag } = require('./organism');
const { updateLeaf, removeLeaf } = require('./leaf');
const { setUpNode } = require('./node');

module.exports = {
  getOrganismByTag,
  updateLeaf,
  removeLeaf,
  setUpNode,
};
