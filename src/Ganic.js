'use strict';

const Klotho = require('./moirai/Klotho');
const Lakhesis = require('./moirai/Lakhesis');

const attach = function(parasitism, deps, firstExcrement) {
  if (!Lakhesis.updatingOrgan) {
    throw new Error("Don't use ATTACH outside of organism!");
  }
  return Lakhesis.updatingOrgan.attach(parasitism, deps, firstExcrement);
};

// todo:  Klotho > organManager
const orphanLive = (organism, props) => {
  const organ = Klotho.get(organism);
  organ.receiveProps(props);
  return organ;
};

// todo: live > create, Organ.create, new Organ(organSetDescription)
const live = function(organism, props, parent, key) {
  if (!parent) {
    return orphanLive(organism, props);
  }
  // todo, add parent and key logic
};

module.exports = {
  attach,
  live,
};
