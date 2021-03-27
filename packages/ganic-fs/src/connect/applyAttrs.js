const fs = require('fs');

const __attrs = Symbol();
const __fileDescriptor = Symbol();
const __statListeners = Symbol();

const applyRef = ({
  organ,
  fullPathname,
  ref,
}) => ref ? ref(getFileDescriptor(organ, fullPathname)) : null;

const fdGetters = {
  text: fullPathname => fs.readFileSync(fullPathname, 'utf8'),
  json: fullPathname => JSON.parse(fs.readFileSync(fullPathname, 'utf8')),
};

const fdSetters = {
  text: (fullPathname, content) => fs.writeFileSync(fullPathname, content),
  json: (fullPathname, obj) => fs.writeFileSync(fullPathname, JSON.stringify(obj, null, 2)),
};

function getFileDescriptor(organ, fullPathname) {
  if (!organ[__fileDescriptor]) {
    organ[__fileDescriptor] = new Proxy({
      fullPathname,
    }, {
      get: function(_, property) {
        if (_.hasOwnProperty(property)) {
          return _[property];
        }

        if (typeof fs[property] === 'function') {
          return fs[property].bind(fs, fullPathname);
        }

        if (fdGetters[property]) {
          return fdGetters[property](fullPathname);
        }

        _.stat = _.stat || fs.statSync(fullPathname);
        return property === 'stat'
          ? _.stat
          : _.stat[property];
      },
      set: function(_, property, value) {
        if (fdSetters[property]) {
          fdSetters[property](fullPathname, value);
        } else {
          _[property] = value;
        }
        return true;
      },
    });
  }
  return organ[__fileDescriptor];
}

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
    watchFile(
      getFileDescriptor(organ, fullPathname),
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
  fullPathname,
  organ,
  name,
  value,
}) => {
  if (name === 'key') {
    return;
  } else if (name === 'ref') {
    applyRef({
      organ,
      fullPathname,
      ref: value,
    });
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
