const descriptors = require('./descriptor');

const __listeners = Symbol();

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
    creature.on(eventName, (...args) => {
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

module.exports = applyEventListener;
