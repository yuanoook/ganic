'use strict';

const Klotho = require('./moirai/Klotho');
const Lakhesis = require('./moirai/Lakhesis');

const attach = function(parasitism, deps, firstExcrement) {
  if (!Lakhesis.updatingOrgan) {
    throw new Error("Don't use ATTACH outside of organism!");
  }
  return Lakhesis.updatingOrgan.attach(parasitism, deps, firstExcrement);
};

const live = ({organism, props, parent, key}) =>
  Klotho.spin({ organism, props }).receiveProps(props);

module.exports = {
  attach,
  live,
};
