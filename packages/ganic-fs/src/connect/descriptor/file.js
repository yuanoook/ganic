const fs = require('fs');

const __descriptor = Symbol();

const fdGetters = {
  text: fullName => fs.readFileSync(fullName, 'utf8'),
  json: fullName => JSON.parse(fs.readFileSync(fullName, 'utf8')),
};

const fdSetters = {
  text: (fullName, content) => fs.writeFileSync(fullName, content),
  json: (fullName, obj) => fs.writeFileSync(fullName, JSON.stringify(obj, null, 2)),
};

function getDescriptor({organ, fullName}) {
  if (!organ[__descriptor]) {
    organ[__descriptor] = new Proxy({
      fullName,
    }, {
      get: function(_, property) {
        if (_.hasOwnProperty(property)) {
          return _[property];
        }

        if (typeof fs[property] === 'function') {
          return fs[property].bind(fs, fullName);
        }

        if (fdGetters[property]) {
          return fdGetters[property](fullName);
        }

        _.stat = _.stat || fs.statSync(fullName);
        return property === 'stat'
          ? _.stat
          : _.stat[property];
      },
      set: function(_, property, value) {
        if (fdSetters[property]) {
          fdSetters[property](fullName, value);
        } else {
          _[property] = value;
        }
        return true;
      },
    });
  }
  return organ[__descriptor];
}

module.exports = getDescriptor;
