'use strict';

const Klotho = require('./moirai/Klotho');
const Lakhesis = require('./moirai/Lakhesis');
const { shutdown } = require('./moirai/Atropos');

const attach = function(parasitism, deps, firstExcrement) {
  if (!Lakhesis.updatingOrgan) {
    throw new Error("Don't use ATTACH outside of organism!");
  }
  return Lakhesis.updatingOrgan.attach(parasitism, deps, firstExcrement);
};

const create = ({organism, props, parent, key}) =>
  Klotho.spin({organism, props, parent, key}).receiveProps(props);

module.exports = {
  create,
  attach,
  shutdown
};
