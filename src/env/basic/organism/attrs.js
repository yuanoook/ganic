'use strict';

const attrsKey = Symbol();
const listenersKey = Symbol();

const applyRef = (node, ref) => ref ? ref(node) : null;

const applyEventListener = (node, name, listener) => {
  const eventName = name.replace(/^on/, '').toLowerCase();
  if (!node[listenersKey]) {
    node[listenersKey] = {};
  }
  if (!node[listenersKey][eventName]) {
    node[listenersKey][eventName] = {};
  }

  const bindInfo = node[listenersKey][eventName];
  bindInfo.listener = listener;

  if (!bindInfo.bound) {
    node.addEventListener(eventName, e => {
      if (typeof bindInfo.listener === 'function') {
        bindInfo.listener(e);
      }
    });
    bindInfo.bound = true;
  }
};

const applyStyle = (node, style) => {
  const oldStyle = node[attrsKey] && node[attrsKey].style;
  if (typeof style === 'object') {
    const checkOldStyle = typeof oldStyle === 'object';
    Object.keys(style).forEach(key => {
      if (checkOldStyle ? oldStyle[key] !== style[key] : true) {
        node.style[key] = style[key];
      }
    });
  }
  if (typeof style === 'string' && oldStyle !== style) {
    node.setAttribute('style', style);
  }
};

const applySimpleAttr = (node, name, value) => {
  if (value === null || value === undefined) {
    node.removeAttribute(name);
  } else {
    node.setAttribute(name, value);
  }
};

const applyAttr = (node, name, value) => {
  if (name === 'key') {
    return;
  } else if (name === 'ref') {
    applyRef(node, value);
  } else if (/^on[A-Z][a-zA-Z]*/.test(name)) {
    applyEventListener(node, name, value);
  } else if (name === 'style') {
    applyStyle(node, value);
  } else {
    applySimpleAttr(node, name, value);
  }
};

const applyAttrs = (node, attrs) => {
  const oldAttrs = node[attrsKey] || {};
  Object.keys({...oldAttrs, ...attrs}).forEach(
    name => oldAttrs[name] !== attrs[name] && applyAttr(node, name, attrs[name]),
  );
  node[attrsKey] = {...attrs};
};

module.exports = {
  applyAttrs,
};
