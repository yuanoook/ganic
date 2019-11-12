'use strict';

const { findEnvParent } = require('./utils');
const { leafDomMap } = require('./map');

const updateLeaf = organLeaf => {
  const value = (organLeaf.value === undefined || organLeaf.value === null)
    ? ''
    : organLeaf.value;

  let textNode = leafDomMap.get(organLeaf);
  if (!textNode) {
    textNode = document.createTextNode(value);
    leafDomMap.set(organLeaf, textNode);
    const parentDom = findEnvParent(organLeaf);
    parentDom.appendChild(textNode);
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
