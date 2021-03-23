const fs = require('fs');
const { organMap } = require('./shared');

const attrsKey = Symbol();
const listenersKey = Symbol();

const applyRef = (node, ref) => ref ? ref(node) : null;

const applyEventListener = ({
  fullPathname,
  organ,
  name,
  listener,
}) => {
  const eventName = name.replace(/^on/, '').toLowerCase();
  const changeReg = /change$/;
  if (!changeReg.test(eventName)) {
    return;
  }


  // TODO: warp this shit together
  const statName = eventName.replace(changeReg, '');

  if (!organ[listenersKey]) {
    organ[listenersKey] = {};
  }
  if (!organ[listenersKey][eventName]) {
    organ[listenersKey][eventName] = {};
  }

  const bindInfo = organ[listenersKey][eventName];
  bindInfo.listener = listener;

  if (!bindInfo.bound) {
    fs.watchFile(fullPathname, function(curr, prev) {
      if (statName && curr[statName] !== prev[statName]) {
        
      }

      if (typeof bindInfo.listener === 'function') {
        bindInfo.listener(curr, prev);
      }
    });
    bindInfo.bound = true;
  }
};

const applyAttr = ({
  fullPathname,
  organ,
  name,
  value,
}) => {
  if (name === 'key') {
    return;
  } else if (name === 'ref') {
    applyRef(organ, value);
  } else if (/^on[A-Z][a-zA-Z]*$/.test(name)) {
    applyEventListener({
      fullPathname,
      organ,
      name,
      listener: value,
    });
  }
};

const applyAttrs = (organ, {fullPathname, attrs}) => {
  const oldAttrs = organ[attrsKey] || {};
  Object.keys({...oldAttrs, ...attrs}).forEach(
    name => oldAttrs[name] !== attrs[name] && applyAttr({
      fullPathname,
      organ,
      name,
      value: attrs[name],
    }),
  );
  organ[attrsKey] = {...attrs};
};

module.exports = applyAttrs;
