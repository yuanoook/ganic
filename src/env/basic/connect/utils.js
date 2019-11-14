'use strict';

const { organDomMap, leafDomMap } = require('./map');

const findEnvParent = organNode => {
  if (organNode.parent) {
    return organDomMap.get(organNode.parent.organ) || findEnvParent(organNode.parent);
  } else if (organNode.tree) {
    return organNode.tree.envRoot;
  }
  throw new Error(`Cannot find env parent`);
};

const isTag = node => organDomMap.has(node.organ);
const getTagDom = node => organDomMap.get(node.organ);

const isLeaf = node => leafDomMap.has(node);
const getText = node => leafDomMap.get(node);

const findDom = node => {
  if (isTag(node)) {
    return getTagDom(node);
  }
  if (isLeaf(node)) {
    return getText(node);
  }
};

const findLastChildDom = node => {
  if (node.lastChild) {
    return findDom(node.lastChild) || findLastChildDom(node.lastChild);
  }
};

const findPreDom = node => {
  if (node.preSibling) {
    return findDom(node.preSibling)
      || findLastChildDom(node.preSibling)
      || findPreDom(node.preSibling);
  }
  if (node.parent) {
    return isTag(node.parent) ? null : findPreDom(node.parent);
  }
  return null;
};

const insertDom = (dom, node) => {
  if (!dom || !node) {
    return;
  }

  const parentDom = findEnvParent(node);
  if (!parentDom) {
    return;
  }

  const preDom = findPreDom(node);
  if (!preDom) {
    parentDom.appendChild(dom);
    return;
  }

  if (preDom.parentNode !== parentDom) {
    throw new Error('Dom structure has changed!');
  }

  parentDom.insertBefore(dom, preDom.nextSibling);
};

module.exports = {
  findEnvParent,
  insertDom,
};
