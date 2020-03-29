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

const applyStyle = (node, name, value) => {
  const oldValue = node[attrsKey] && node[attrsKey].style;
  if (typeof value === 'object' && value) {
    const checkOldValue = typeof oldValue === 'object' && oldValue;
    Object.keys(value).forEach(key => {
      if (checkOldValue ? oldValue[key] !== value[key] : true) {
        node.style[key] = value[key];
      }
    });
  }
  if (typeof value === 'string' && oldValue !== value) {
    applySimpleAttr(node, name, value);
  }
};

const applyClass = (node, name, value) => {
  const oldValue = node[attrsKey] && node[attrsKey].class;
  // TODO: support Array
  if (typeof value === 'object' && value) {
    const checkOldValue = typeof oldValue === 'object' && oldValue;
    Object.keys(value).forEach(key => {
      if (checkOldValue ? oldValue[key] !== value[key] : true) {
        node.classList[value[key] ? 'add' : 'remove'](key);
      }
    });
  }
  if (typeof value === 'string' && oldValue !== value) {
    applySimpleAttr(node, name, value);
  }
};

const properties = ['value', 'checked', 'selected', 'disabled'];
const applySimpleProperty = (node, name, value) => {
  if (node[name] !== value) {
    node[name] = value;
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
  } else if (/^on[A-Z][a-zA-Z]*$/.test(name)) {
    applyEventListener(node, name, value);
  } else if (name === 'style') {
    applyStyle(node, name, value);
  } else if (name === 'class') {
    applyClass(node, name, value);
  } else if (properties.includes(name)) {
    applySimpleProperty(node, name, value);
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

module.exports = applyAttrs;
