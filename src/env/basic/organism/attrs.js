'use strict';

const attributeMap = {
  className: 'class',
};

const getAttrName = name => attributeMap[name] || name;

const applyEventListener = (node, name, listener) => {
  const eventName = name.replace(/^on/, '').toLowerCase();
  node.addEventListener(eventName, listener);
};

const applySimpleAttr = (node, name, value) => {
  const attrName = getAttrName(name);
  if (value === null || value === undefined) {
    node.removeAttribute(attrName);
  } else {
    node.setAttribute(attrName, value);
  }
};

const applyAttr = (node, name, value) => {
  const isAboutEvent = /^on[A-Z][a-zA-Z]*/.test(name);
  if (isAboutEvent) {
    applyEventListener(node, name, value);
  } else {
    applySimpleAttr(node, name, value);
  }
};

const applyAttrs = (node, attrs) =>
  Object.keys(attrs).forEach(
    name => applyAttr(node, name, attrs[name]),
  );

module.exports = {
  applyAttrs,
};
