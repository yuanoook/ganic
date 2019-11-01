'use strict';

const SINGLETON = require('./etc/singleton');
const orphanage = require('./etc/orphanage');

const attach = function(parasitism, deps, firstExcrement) {
  if (!SINGLETON.operatingOrgan) {
    throw new Error("Don't use ATTACH outside of organism!");
  }
  return SINGLETON.operatingOrgan.attach(parasitism, deps, firstExcrement);
};

const orphanLive = (organism, props) => {
  const organ = orphanage.get(organism);
  organ.receiveProps(props);
  return organ;
};

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
