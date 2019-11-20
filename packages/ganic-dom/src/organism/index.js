
const { organismFactory } = require('./dom');

const organisms = {
  box: organismFactory('div'),
};

const getOrganismByTag = tagName => {
  if (organisms[tagName]) {
    return organisms[tagName];
  }
  return organismFactory(tagName);
};

module.exports = {
  getOrganismByTag,
};
