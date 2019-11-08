'use strict';

const { Box } = require('./Box');

const organisms = {
  box: Box,
};

const getOrganismByTag = tagName => {
  if (organisms[tagName]) {
    return organisms[tagName];
  }
  throw new Error(`Cannot find tag: ${tagName}`);
};

module.exports = {
  getOrganismByTag,
};
