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

const use = attach;

const create = ({organism, props, parent, key}) =>
  Klotho.spin({organism, props, parent, key}).receiveProps(props);

const live = create;

module.exports = {
  live,
  create,

  use,
  attach,

  shutdown
};
