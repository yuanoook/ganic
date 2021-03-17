const { insertFile, removeFile } = require('./utils');
const { leafMap } = require('./shared');

const updateLeaf = organLeaf => {
  const value = (organLeaf.value === undefined || organLeaf.value === null)
    ? ''
    : organLeaf.value;

  let textNode = leafMap.get(organLeaf);
  if (!textNode) {
    textNode = document.createTextNode(value);
    leafMap.set(organLeaf, textNode);
    insertFile(textNode, organLeaf);
    return;
  }

  const newContent = document.createTextNode(value).textContent;
  if (textNode.textContent !== newContent) {
    textNode.textContent = newContent;
  }
};

const vanishLeaf = organLeaf => {
  const textNode = leafMap.get(organLeaf);
  leafMap.delete(organLeaf);
  if (textNode) {
    removeFile(textNode);
  }
};

module.exports = {
  updateLeaf,
  vanishLeaf,
};
