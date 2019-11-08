'use strict';

const { getOrganismByTag } = require('./organism');
const { updateLeaf, removeLeaf } = require('./leaf');

module.exports = {
  getOrganismByTag,
  updateLeaf,
  removeLeaf,
};
