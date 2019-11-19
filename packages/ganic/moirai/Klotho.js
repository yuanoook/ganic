
const { Organ } = require('../lab/Organ');
const { OrganTree } = require('../lab/OrganTree');
const basicUI = require('../env/basic');
const wood = new Map();

const render = ({organDesc, envRoot, envUtils = basicUI}) => {
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

const create = ({organism, props}) =>
  new Organ({organism, props});

module.exports = {
  render,
  create,
};
