const { insertDom, removeDom } = require('./utils');
const { leafDomMap } = require('./shared');

const updateLeaf = organLeaf => {
  const value = (organLeaf.value === undefined || organLeaf.value === null)
    ? ''
    : organLeaf.value;

  let textNode = leafDomMap.get(organLeaf);
  if (!textNode) {
    textNode = document.createTextNode(value);
    leafDomMap.set(organLeaf, textNode);
    insertDom(textNode, organLeaf);
    return;
  }

  const newContent = document.createTextNode(value).textContent;
  if (textNode.textContent !== newContent) {
    textNode.textContent = newContent;
  }
};

const vanishLeaf = organLeaf => {
  const textNode = leafDomMap.get(organLeaf);
  leafDomMap.delete(organLeaf);
  if (textNode) {
    removeDom(textNode);
  }
};

module.exports = {
  updateLeaf,
  vanishLeaf,
};
