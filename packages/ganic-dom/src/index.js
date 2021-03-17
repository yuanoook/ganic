const { updateLeaf, vanishLeaf } = require('./connect/leaf');
const { relocate, insertDom } = require('./connect/utils');
const { organDomMap } = require('./connect/shared');
const { taskify, clearTasks } = require('../../shared/taskQueue');
const getOrganism = require('./connect/getOrganism');

const setUpNode = node => {
  const dom = organDomMap.get(node.organ);
  insertDom(dom, node);
};

const onReady = taskify(setUpNode);
const getTagkitFactory = configs => tagName => ({
  organism: getOrganism(tagName, configs),
  onReady,
});

const base = {
  updateLeaf: taskify(updateLeaf),
  vanishLeaf: taskify(vanishLeaf),
  relocate: taskify(relocate),
  onSettled: clearTasks,
  onBuried: clearTasks,
};

const envDom = config => {
  const configs = !Array.isArray(config) ? [config] : config;
  return {
    getTagkit: getTagkitFactory(configs),
    ...base,
  };
};

module.exports = envDom;
