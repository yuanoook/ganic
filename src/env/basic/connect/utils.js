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

const findLastUnderDom = node => {
  if (node.lastChild) {
    return findDom(node.lastChild) || findLastUnderDom(node.lastChild) || findPreDom(node.lastChild);
  }
};

const findUnderDoms = node => {
  const dom = findDom(node);
  if (dom) {
    return [dom];
  }

  let child = node.firstChild;
  let doms = [];
  while (child) {
    doms = doms.concat(findDom(child) || findUnderDoms(child));
    child = child.nextSibling;
  }
  return doms;
};

const findPreDom = node => {
  if (node.preSibling) {
    return findDom(node.preSibling)
      || findLastUnderDom(node.preSibling)
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

  const preDom = findPreDom(node);
  const doms = findUnderDoms(node);

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
