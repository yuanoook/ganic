'use strict';
const { attrNameMap: nameMap } = require('./attribute');

const getAttrName = name => nameMap[name] || name;

const applyAttrs = (node, attrs) => {
  Object.keys(attrs).forEach(name => {
    const value = attrs[name];
    const realName = getAttrName(name);
    if (value === null || value === undefined) {
      node.removeAttribute(realName);
    } else {
      node.setAttribute(realName, value);
    }
  });
};

module.exports = {
  applyAttrs,
};
