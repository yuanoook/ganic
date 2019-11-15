'use strict';

const { OrganNode } = require('../../../lab/OrganNode');
const { OrganLeaf } = require('../../../lab/OrganLeaf');
const { organDomMap, leafDomMap } = require('./map');

const findEnvParent = organNode => {
  if (organNode.parent) {
    return organDomMap.get(organNode.parent.organ) || findEnvParent(organNode.parent);
  } else if (organNode.tree) {
    return organNode.tree.envRoot;
  }
  throw new Error(`Cannot find env parent`);
};

const isTag = node => node instanceof OrganNode && organDomMap.has(node.organ);
const getTagDom = node => organDomMap.get(node.organ);

const isLeaf = node => node instanceof OrganLeaf && leafDomMap.has(node);
const getText = node => leafDomMap.get(node);

const findDom = node => {
  if (isTag(node)) {
    return getTagDom(node);
  }
  if (isLeaf(node)) {
    return getText(node);
  }
};

const insertDom = (dom, node) => {
  if (!dom || !node) {
    return;
  }

  const parentDom = findEnvParent(node);
  if (!parentDom) {
    return;
  }

  const preDom = node.findPre(findDom);
  if (!preDom) {
    parentDom.insertBefore(dom, parentDom.firstChild);
    return;
  }

  if (preDom.parentNode !== parentDom) {
    throw new Error('Dom structure has changed!');
  }

  parentDom.insertBefore(dom, preDom.nextSibling);
};

const relocate = node => {
  const parentDom = findEnvParent(node);
  if (!parentDom) {
    return;
  }
  const doms = node.findOnes(findDom);
  if (!doms.length) {
    return;
  }

  const preDom = node.findPre(findDom);
  if (preDom ? preDom.nextSibling === doms[0] : parentDom.firstChild === doms[0]) {
    return;
  }

  doms.forEach((dom, index) => {
    if (index === 0) {
      if (!preDom) {
        parentDom.insertBefore(dom, parentDom.firstChild);
      } else {
        parentDom.insertBefore(dom, preDom.nextSibling);
      }
    } else {
      const pre = doms[index - 1];
      parentDom.insertBefore(dom, pre.nextSibling);
    }
  });
};

module.exports = {
  findEnvParent,
  insertDom,
  relocate,
};
