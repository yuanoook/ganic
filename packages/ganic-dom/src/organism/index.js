const { organismFactory } = require('./dom');

const organisms = {};

const getOrganism = tagName => {
  if (organisms[tagName]) {
    return organisms[tagName];
  }
  return organismFactory(tagName);
};

module.exports = {
  getOrganism,
};
