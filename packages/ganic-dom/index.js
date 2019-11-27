const GanicTree = require('ganic-tree');
const envDOM = require('./src/index');

const render = (organDesc, envRoot) => 
  GanicTree.render({organDesc, envRoot, envRunner: envDOM});

module.exports = {
  render,
};
