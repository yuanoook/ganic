'use strict';

const { leafDomMap } = require('./map');
const { findEnvParent } = require('./relationship');

const updateLeaf = organLeaf => {
  let textNode = leafDomMap.get(organLeaf);
  if (!textNode) {
    textNode = document.createTextNode(organLeaf.value);
    leafDomMap.set(organLeaf, textNode);

    let parentDom = findEnvParent(organLeaf);
    parentDom.appendChild(textNode);
    return;
  }

  const newContent = document.createTextNode(organLeaf.value).textContent;
  if (textNode.textContent !== newContent) {
    textNode.textContent = newContent;
  }
};

const removeLeaf = organLeaf => {
  const textNode = leafDomMap.get(organLeaf);
  if (textNode) {
    textNode.remove();
    leafDomMap.delete(organLeaf);
  }
};

module.exports = {
  updateLeaf,
  removeLeaf,
};
