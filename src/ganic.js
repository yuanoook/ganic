'use strict';

const SINGLETON = require('./etc/singleton');
const orphanage = require('./etc/orphanage');

const attach = function(parasitism, deps, firstExcrement) {
  if (!SINGLETON.updatingOrgan) {
    throw new Error("Don't use ATTACH outside of organism!");
  }
  return SINGLETON.updatingOrgan.attach(parasitism, deps, firstExcrement);
};

// todo:  orphanage > organManager
const orphanLive = (organism, props) => {
  const organ = orphanage.get(organism);
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
