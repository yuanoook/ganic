const { getTreeByRoot } = require('./lab/wood');
const { OrganTree } = require('./lab/OrganTree');
const { OrganNode } = require('./lab/OrganNode');
const { OrganLeaf } = require('./lab/OrganLeaf');
const nullEnv = require('./env');

const render = ({organDesc, envRoot, envRunner = nullEnv}) => {
  let tree = getTreeByRoot(envRoot);
  if (tree) {
    tree.update(organDesc);
  } else {
    tree = new OrganTree({organDesc, envRoot, envRunner});
  }
  return tree;
};

module.exports = {
  render,
  OrganNode,
  OrganLeaf,
};
