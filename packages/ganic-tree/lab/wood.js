const wood = [];

const getTrees = () => [...wood];
const addTree = tree => {
  if (!wood.includes(tree)) {
    wood.push(tree);
  }
};
const getTreeByRoot = envRoot => wood.find(tree => tree.envRoot === envRoot);
const removeTree = tree => {
  if (wood.includes(tree)) {
    wood.splice(wood.indexOf(tree), 1);
  }
};
const clear = () => {
  wood.length = 0;
};

module.exports = {
  getTrees,
  addTree,
  getTreeByRoot,
  removeTree,
  clear,
};
