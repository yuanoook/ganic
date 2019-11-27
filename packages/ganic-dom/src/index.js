const { getOrganism } = require('./organism');
const { setUpNode, relocate } = require('./connect/node');
const { updateLeaf, vanishLeaf } = require('./connect/leaf');
const { taskify, clearTasks } = require('./taskStack');

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
