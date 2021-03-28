const descriptors = require('./descriptor');

const __attrs = Symbol();
const __statListeners = Symbol();

const applyRef = ({
  tagName,
  organ,
  fullPathname,
  ref,
}) => ref ? ref(descriptors[tagName](organ, fullPathname)) : null;

const applyEventListener = ({
  tagName,
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
    watchFile(
      descriptors[tagName](organ, fullPathname),
      organ[__statListeners] = {},
    );
  }

  organ[__statListeners][statName] = listener;
};

function watchFile (fileDescriptor, statListeners) {
  fileDescriptor.watchFile({
    persistent: false,
    interval: 1000,
  }, function(curr, prev) {
    fileDescriptor.stat = curr;

    if (statListeners['']) {
      statListeners[''](fileDescriptor, prev);
    }

    for (let key in curr) {
      let statChanged = !prev || curr[key] !== prev[key];
      if (!statChanged) {
        continue;
      }

      key = key.toLowerCase();
      if (statListeners[key]) {
        statListeners[key](
          curr[key],
          prev && prev[key],
          fileDescriptor,
        );
      }
    }
  });
}

const applyAttr = ({
  tagName,
  fullPathname,
  organ,
  name,
  value,
}) => {
  if (name === 'key') {
    return;
  } else if (name === 'ref') {
    applyRef({
      tagName,
      organ,
      fullPathname,
      ref: value,
    });
  } else if (/^on[A-Z][a-zA-Z]*$/.test(name)) {
    applyEventListener({
      tagName,
      fullPathname,
      organ,
      name,
      listener: value,
    });
  }
};

const applyAttrs = (organ, {tagName, fullPathname, attrs}) => {
  const oldAttrs = organ[__attrs] || {};
  Object.keys({...oldAttrs, ...attrs}).forEach(
    name => oldAttrs[name] !== attrs[name] && applyAttr({
      tagName,
      fullPathname,
      organ,
      name,
      value: attrs[name],
    }),
  );
  organ[__attrs] = {...attrs};
};

module.exports = applyAttrs;
