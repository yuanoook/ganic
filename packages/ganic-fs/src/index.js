const { updateLeaf, vanishLeaf } = require('./connect/leaf');
const { insertFile } = require('./connect/utils');
const { organMap } = require('./connect/shared');
const { taskify, clearTasks } = require('../../shared/taskQueue');
const getOrganism = require('./connect/getOrganism');

const setUpNode = node => {
  const dom = organMap.get(node.organ);
  insertFile(dom, node);
};

const onReady = taskify(setUpNode);
const getTagkitFactory = configs => tagName => ({
  organism: getOrganism(tagName, configs),
  onReady,
});

const base = {
  updateLeaf: taskify(updateLeaf),
  vanishLeaf: taskify(vanishLeaf),
  relocate: () => null,
  onSettled: clearTasks,
  onBuried: clearTasks,
};

const envFS = config => {
  const configs = !Array.isArray(config) ? [config] : config;
  return {
    getTagkit: getTagkitFactory(configs),
    ...base,
  };
};

module.exports = envFS;
