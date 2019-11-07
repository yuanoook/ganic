'use strict';

const { Organ } = require('./Organ');
const { flat } = require('./utils');

const OrganNode = function({organ, parent}) {
  this.setUp({organ, parent});
  this.update = this.update.bind(this);
  organ.addListener(this.update);
};

OrganNode.prototype = {
  setUp: function(props) {
    Object.assign(this, {
      organ: null,
      parent: null,
      children: {},
    }, props);
  },
  clearUp: function() {
    this.setUp();
  },

  update: function() {
    const descKeys = this.getDescKeys();
    const childrenKeys = Object.keys(this.children);

    const toUpdateKeys = descKeys.filter(x => childrenKeys.includes(x));
    const toCreateKeys = descKeys.filter(x => !toUpdateKeys.includes(x));
    const toVanishKeys = childrenKeys.filter(x => !toUpdateKeys.includes(x));

    toVanishKeys.forEach(key => this.vanishChildByKey(key));
    toCreateKeys.forEach(key => this.createChildByKey(key));
    toUpdateKeys.forEach(key => this.updateChildByKey(key));
  },
  getDescs: function() {
    // TODO: resolve repeat keys
    // TODO: cache descs
    // TODO: create cached key
    // TODO: handle non-organ-desc
    let descs = Array.isArray(this.organ.result) ? this.organ.result : [this.organ.result];
    descs = flat(descs, Infinity).filter(({organism}) => typeof organism === 'function');
    return descs;
  },
  getDescKeys: function() {
    const descs = this.getDescs();
    return descs.map(({key}, index) => (key !== undefined && key !== null) ? key : index);
  },

  getChildByKey: function(key) {
    return this.children[key];
  },
  getDescByKey: function(key) {
    const descs = this.getDescs();
    return descs.find(({key: descKey}, index) => key === descKey || key === index);
  },

  vanishChildByKey: function(key) {
    this.getChildByKey(key).vanish();
  },
  createChildByKey: function(key) {
    const {organism, props} = this.getDescByKey(key);
    this.children[key] = this.createChildByDesc({organism, props});
  },
  updateChildByKey: function(key) {
    const {organism, props} = this.getDescByKey(key);
    const childNode = this.getChildByKey(key);
    if (childNode.organ.organism === organism) {
      childNode.organ.receive(props);
    } else {
      this.children[key] = this.createChildByDesc({organism, props});
    }
  },

  createChildByDesc: function({organism, props}) {
    const organ = new Organ({organism}).receive(props);
    const node = new OrganNode({organ, parent: this});
    return node;
  },

  vanish: function() {
    this.organ.vanish();
    this.clearUp();
  },
};

module.exports = {
  OrganNode,
};
