const { insertDom } = require('./utils');
const { leafDomMap } = require('./map');

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
  if (textNode) {
    textNode.remove();
    leafDomMap.delete(organLeaf);
  }
};

module.exports = {
  updateLeaf,
  vanishLeaf,
};
