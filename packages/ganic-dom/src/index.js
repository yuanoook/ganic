const { getOrganism } = require('./organism');
const { setUpNode, relocate } = require('./connect/node');
const { updateLeaf, vanishLeaf } = require('./connect/leaf');

const taskStack = [];
const taskify = fn => (...args) => taskStack.push(() => fn(...args));
const clearTasks = () => {
  const length = taskStack.length;
  for (let i = 0; i < length; i++) {
    taskStack[i]();
  }
  taskStack.length = 0;
};

const onReady = taskify(setUpNode);
const getTagkit = tagName => {
  return {
    organism: getOrganism(tagName),
    onReady,
  };
};

module.exports = {
  getTagkit,
  updateLeaf: taskify(updateLeaf),
  vanishLeaf: vanishLeaf,
  relocate: taskify(relocate),
  onSettled: clearTasks,
};
