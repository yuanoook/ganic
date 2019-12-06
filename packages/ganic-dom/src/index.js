const { getOrganism } = require('./connect/dom');
const { updateLeaf, vanishLeaf } = require('./connect/leaf');
const { relocate, insertDom } = require('./connect/utils');
const { organDomMap, nameSpace } = require('./connect/shared');
const { taskify, clearTasks } = require('./taskQueue');

const setUpNode = node => {
  const dom = organDomMap.get(node.organ);
  insertDom(dom, node);
  nameSpace.leave(dom.tagName);
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
  vanishLeaf: taskify(vanishLeaf),
  relocate: taskify(relocate),
  onSettled: clearTasks,
  onBuried: clearTasks,
};
