const GanicTree = require('ganic-tree');
const envDom = require('./src/index');

/**
 * @param {*} organDesc 
 * @param {*} envRoot 
 * @param {*} config : [{ makeOrganism: (tagName, attachTag) => organismFn }]
 */
const render = (organDesc, envRoot, config) => 
  GanicTree.render({organDesc, envRoot, envRunner: envDom(config)});

module.exports = {
  render,
};
