'use strict';

const Klotho = require('./moirai/Klotho');
const Lakhesis = require('./moirai/Lakhesis');
const { shutdown } = require('./moirai/Atropos');

const attach = function(parasitism, deps, firstExcrement) {
  const updatingOrgan = Lakhesis.getUpdatingOrgan();
  if (!updatingOrgan) {
    throw new Error("Don't use ATTACH outside of organism!");
  }
  return updatingOrgan.attach(parasitism, deps, firstExcrement);
};

const create = ({organism, props, parent, key}) =>
  Klotho.spin({organism, props, parent, key}).receive(props);

module.exports = {
  create,
  attach,
  shutdown,
};
