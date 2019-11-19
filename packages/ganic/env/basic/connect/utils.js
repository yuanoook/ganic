
const { OrganNode } = require('../../../lab/OrganNode');
const { OrganLeaf } = require('../../../lab/OrganLeaf');
const { organDomMap, leafDomMap } = require('./map');
const { findParent, findPre, findOnes } = require('../../utils');

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

  const parentDom = findParent(node, findDom);
  if (!parentDom) {
    return;
  }

  const preDom = findPre(node, findDom);
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
  const parentDom = findParent(node, findDom);
  if (!parentDom) {
    return;
  }
  const doms = findOnes(node, findDom);
  if (!doms.length) {
    return;
  }

  const preDom = findPre(node, findDom);
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
  insertDom,
  relocate,
};
