const fs = require('fs');

const __attrs = Symbol();
const __statListeners = Symbol();

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

  const statName = eventName.replace(changeReg, '');

  if (!organ[__statListeners]) {
    watchFile(fullPathname, organ[__statListeners] = {});
  }

  organ[__statListeners][statName] = listener;
};

function watchFile (fullPathname, statListeners) {
  fs.watchFile(fullPathname, {
    persistent: false,
    interval: 1000,
  }, function(curr, prev) {
    if (statListeners['']) {
      statListeners[''](curr, prev);
    }

    for (let key in curr) {
      let statChanged = !prev || curr[key] !== prev[key];
      if (!statChanged) continue;

      key = key.toLowerCase();
      if (statListeners[key]) {
        statListeners[key](curr[key], prev && prev[key]);
      }
    }
  });
}

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
  const oldAttrs = organ[__attrs] || {};
  Object.keys({...oldAttrs, ...attrs}).forEach(
    name => oldAttrs[name] !== attrs[name] && applyAttr({
      fullPathname,
      organ,
      name,
      value: attrs[name],
    }),
  );
  organ[__attrs] = {...attrs};
};

module.exports = applyAttrs;
