const { organDomMap, leafDomMap } = require('./map');
const { findParent, findPre, findOnes } = require('../../../shared/lostboy');

const getTagDom = node => organDomMap.get(node.organ);
const getText = node => leafDomMap.get(node);
const findDom = node => getTagDom(node) || getText(node);

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

const removeDom = Element.prototype.remove
  ? dom => dom.remove()
  : dom => {
    if (dom.parentNode) {
      dom.parentNode.removeChild(dom);
    }
  };

module.exports = {
  insertDom,
  removeDom,
  relocate,
};
