const GanicTree = require('ganic-tree');
const envFS = require('./src/index');

/**
 * @param {*} organDesc 
 * @param {*} envRoot : root file / folder
 * @param {*} config : [{ makeOrganism: (tagName, attachTag) => organismFn }]
 */
const render = (organDesc, envRoot, config) => 
  GanicTree.render({organDesc, envRoot, envRunner: envFS(config)});

module.exports = {
  render,
};
