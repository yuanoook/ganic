'use strict';

const {Parasite} = require('./Parasite');
const {shallowEqual} = require('./utils');
const Lakhesis = require('./moirai/Lakhesis');

const Organ = function({organism}) {
  if (typeof organism !== 'function') {
    throw new Error('To create an Organ, organism must be a function!');
  }
  Object.assign(this, {
    organism,
    result: null,
    subOrganSetDescription: null,
    props: null,
    parasites: [],
    parasiteCheckingIndex: 0,
    listeners: [],
  });

  this.receive = this.receiveProps;
};

Organ.prototype = {
  receiveProps: function(props) {
    if (!shallowEqual(this.props, props)) {
      this.props = props;
      this.update(); 
    }
    return this;
  },
  update: function() {
    Lakhesis.updatingOrgan = this;

    this.parasiteCheckingIndex = 0;
    this.result = this.organism(this.props);
    this.subOrganSetDescription = this.result;
    this.wakeListeners();

    Lakhesis.updatingOrgan = null;
    return this;
  },
  getParasite(index) {
    const parasite = this.parasites[index];
    if (parasite) {
      return parasite;
    }
    this.parasites[index] = new Parasite({organ: this});
    return this.parasites[index];
  },
  take: function(deps) {
    const parasite = this.getParasite(this.parasiteCheckingIndex);
    parasite.receiveDeps(deps);
    this.parasiteCheckingIndex++;

    return parasite;
  },
  attach: function(parasitism, deps, firstExcrement) {
    return this.take(deps)
      .attach(parasitism)
      .firstGive(firstExcrement);
  },
  addListener: function(func) {
    this.listeners.push(func);
    func(this.result);
    return this;
  },
  wakeListeners: function() {
    this.listeners.forEach(func => func(this.result));
    return this;
  },
};

module.exports = {
  Organ,
};
