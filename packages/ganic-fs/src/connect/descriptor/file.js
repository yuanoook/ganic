const fs = require('fs');

const __fileDescriptor = Symbol();

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

module.exports = getFileDescriptor;
