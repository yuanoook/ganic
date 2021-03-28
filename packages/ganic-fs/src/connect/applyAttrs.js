const descriptors = require('./descriptor');

const __attrs = Symbol();
const __listeners = Symbol();

const applyRef = ({
  tagName,
  organ,
  fullName,
  ref,
  creature,
}) => ref ? ref(descriptors[tagName]({organ, fullName, creature})) : null;

const eventHandlers = {
  dir: bindStatChange,
  file: bindStatChange,
  server: bindEventEmitter,
  client: bindEventEmitter,
};

const applyEventListener = ({
  tagName,
  fullName,
  organ,
  name,
  creature,
  listener,
}) => {
  const eventName = name.replace(/^on/, '').toLowerCase();
  const descriptor = descriptors[tagName]({organ, fullName, creature});

  return eventHandlers[tagName]({
    eventName,
    organ,
    fullName,
    listener,
    creature,
    descriptor,
  });
};

function bindEventEmitter ({
  eventName,
  organ,
  listener,
  creature,
  descriptor,
}) {
  if (!organ[__listeners]) {
    organ[__listeners] = {};
  }

  if (!organ[__listeners][eventName]) {
    organ[__listeners][eventName] = {};
    creature.addEventListener(eventName, (...args) => {
      const l = organ[__listeners][eventName].listener;
      return l && l(...args, descriptor);
    });
  }

  organ[__listeners][eventName].listener = listener;
}

function bindStatChange ({
  eventName,
  organ,
  listener,
  descriptor,
}) {
  const changeReg = /change$/;
  if (!changeReg.test(eventName)) {
    return;
  }

  const statName = eventName.replace(changeReg, '');

  if (!organ[__listeners]) {
    watchFile(
      descriptor,
      organ[__listeners] = {},
    );
  }

  organ[__listeners][statName] = listener;
}

function watchFile (descriptor, statListeners) {
  descriptor.watchFile({
    persistent: false,
    interval: 1000,
  }, function(curr, prev) {
    descriptor.stat = curr;

    if (statListeners['']) {
      statListeners[''](descriptor, prev);
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
          descriptor,
        );
      }
    }
  });
}

const applyAttr = ({
  tagName,
  fullName,
  organ,
  name,
  value,
  creature,
}) => {
  if (name === 'key') {
    return;
  } else if (name === 'ref') {
    applyRef({
      tagName,
      organ,
      fullName,
      ref: value,
      creature,
    });
  } else if (/^on[A-Z][a-zA-Z]*$/.test(name)) {
    applyEventListener({
      tagName,
      fullName,
      organ,
      name,
      listener: value,
      creature,
    });
  }
};

const applyAttrs = (organ, {tagName, fullName, attrs, creature}) => {
  const oldAttrs = organ[__attrs] || {};
  Object.keys({...oldAttrs, ...attrs}).forEach(
    name => oldAttrs[name] !== attrs[name] && applyAttr({
      tagName,
      fullName,
      organ,
      name,
      value: attrs[name],
      creature,
    }),
  );
  organ[__attrs] = {...attrs};
};

module.exports = applyAttrs;
