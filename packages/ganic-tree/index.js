const { OrganTree } = require('./lab/OrganTree');
const { OrganNode } = require('./lab/OrganNode');
const { OrganLeaf } = require('./lab/OrganLeaf');
const nullEnv = require('./env');
const wood = new Map();

const render = ({organDesc, envRoot, envUtils = nullEnv}) => {
  let tree;
  if (wood.has(envRoot)) {
    tree = wood.get(envRoot);
    tree.update(organDesc);
  } else {
    tree = new OrganTree({organDesc, envRoot, envUtils});
    wood.set(envRoot, tree);
  }
  return tree;
};

module.exports = {
  render,
  OrganNode,
  OrganLeaf,
};
