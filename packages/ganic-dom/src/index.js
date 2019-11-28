const { getOrganism } = require('./organism');
const { setUpNode, relocate } = require('./connect/node');
const { updateLeaf, vanishLeaf } = require('./connect/leaf');
const { taskify, clearTasks } = require('./taskQueue');

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
  vanishLeaf: taskify(vanishLeaf),
  relocate: taskify(relocate),
  onSettled: clearTasks,
  onBuried: clearTasks,
};
