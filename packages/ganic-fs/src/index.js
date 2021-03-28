const { updateLeaf, vanishLeaf } = require('./connect/leaf');
const { getFullName, insertFile } = require('./connect/utils');
const { organMap } = require('./connect/shared');
const { taskify, clearTasks } = require('../../shared/taskQueue');
const getOrganism = require('./connect/getOrganism');
const applyAttrs = require('./connect/applyAttrs');

const setUpFullName = node => {
  organMap.set(node.organ, {
    fullName: getFullName(node),
    ...organMap.get(node.organ),
  });
};

const setUpNode = node => {
  setUpFullName(node);

  const fileDesc = organMap.get(node.organ);
  fileDesc.creature = insertFile(node.organ, fileDesc);

  applyAttrs(node.organ, fileDesc);
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
