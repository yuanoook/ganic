'use strict';

const Klotho = require('./moirai/Klotho');
const Lakhesis = require('./moirai/Lakhesis');

const attach = function(parasitism, deps, firstExcrement) {
  if (!Lakhesis.updatingOrgan) {
    throw new Error("Don't use ATTACH outside of organism!");
  }
  return Lakhesis.updatingOrgan.attach(parasitism, deps, firstExcrement);
};

const create = (organism, props) =>
  Klotho.spin({ organism, props }).receiveProps(props);

const live = function(organism, props, parent, key) {
  if (!parent) {
    return create(organism, props);
  }
};

module.exports = {
  attach,
  live,
};
