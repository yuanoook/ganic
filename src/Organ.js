'use strict';

const {Parasite} = require('./Parasite');
const {shallowEqual} = require('./utils');
const Lakhesis = require('./moirai/Lakhesis');

const Organ = function({organism}) {
  if (typeof organism !== 'function') {
    throw new Error('To create an Organ, organism must be a function!');
  }
  this.setUp({organism});
};

Organ.prototype = {
  setUp: function(props) {
    Object.assign(this, {
      organism: null,
      props: null,
      result: null,
      subOrganSetDescription: null,
      parasites: [],
      parasiteCheckingIndex: 0,
      listeners: [],
    }, props);
  },
  clearUp: function() {
    this.setUp();
  },

  receive: function(props) {
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
    this.parasites[index] = new Parasite({organ: this, index});
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
  removeAllParasites: function() {
    this.parasites.forEach(parasite => parasite.shutdown());
    this.parasites = [];
  },

  addListener: function(func) {
    this.listeners.push(func);
    func(this.result);
    return this;
  },
  removeListner: function(listener) {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
  },
  wakeListeners: function() {
    this.listeners.forEach(func => func(this.result));
    return this;
  },
  removeAllListners: function() {
    this.listeners = [];
  },

  shutdown: function() {
    this.removeAllParasites();
    this.removeAllListners();
  }
};

module.exports = {
  Organ,
};
