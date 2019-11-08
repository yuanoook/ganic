'use strict';
/* eslint-disable no-multi-spaces */

const { Organ } = require('./Organ');
const { OrganLeaf } = require('./OrganLeaf');
const { flat } = require('./utils');

/**
 * OrganNode is the wrapper for one organ
 * It handles the parent - children relationship things
 * It manages the update of its children
 */

const OrganNode = function({organ, parent, tree}) {
  this.setUp({organ, parent, tree});
  this.update = this.update.bind(this);
  this.vanishChildByKey = this.vanishChildByKey.bind(this);
  organ.addListener(this.update);
};

OrganNode.prototype = {
  setUp: function(config) {
    Object.assign(this, {
      organ: null,
      parent: null,
      tree: null,
      children: {},
    }, config);
  },
  clearUp: function() {
    this.setUp();
  },

  update: function() {
    this.descs = this.parseDescs();
    const descKeys = this.getDescKeys();
    const childrenKeys = Object.keys(this.children);

    const toUpdateKeys = descKeys.filter(x => childrenKeys.includes(x));
    const toCreateKeys = descKeys.filter(x => !toUpdateKeys.includes(x));
    const toVanishKeys = childrenKeys.filter(x => !toUpdateKeys.includes(x));

    toVanishKeys.forEach(key => this.vanishChildByKey(key));
    toUpdateKeys.forEach(key => this.updateChildByKey(key));
    toCreateKeys.forEach(key => this.createChildByKey(key));
  },

  parseDescs: function() {
    const descs = Array.isArray(this.organ.result) ? this.organ.result : [this.organ.result];
    return flat(descs, Infinity);
  },
  getDescKeys: function() {
    return this.descs.map(({key} = {}, index) => (key !== undefined && key !== null) ? key : index);
  },
  getDescByKey: function(key) {
    return this.descs.find(({key: descKey} = {}, index) => key === descKey || key === index);
  },

  vanishChildByKey: function(key) {
    if (this.children[key]) {
      this.children[key].vanish();
      this.children[key] = null;
    }
  },
  vanishAllChildren: function() {
    const childrenKeys = Object.keys(this.children);
    childrenKeys.forEach(key => this.vanishChildByKey(key));
  },
  createChildByKey: function(key) {
    const desc = this.getDescByKey(key);
    const isDescNode = desc && desc.organism && typeof desc.organism === 'function';
    this.vanishChildByKey(key);
    if (isDescNode) { // create new organNode
      const {organism, props} = desc;
      const organ = new Organ({organism, props, node: this});
      this.children[key] = new OrganNode({organ, parent: this, tree: this.tree});
    } else {          // create new organLeaf
      this.children[key] = new OrganLeaf({value: desc, parent: this, tree: this.tree});
    }
  },
  updateChildByKey: function(key) {
    const desc = this.getDescByKey(key);
    const {organism, props} = desc || {};
    const isDescNode = typeof organism === 'function';
    const isDescLeaf = !isDescNode;
  
    const child = this.children[key];
    const isChildNode = child instanceof OrganNode;
    const isChildLeaf = child instanceof OrganLeaf;

    if (isChildNode && isDescNode && child.organ.organism === organism) {
      child.organ.receive(props); // update existing same type organNode
    } else if (isChildLeaf && isDescLeaf) {
      child.receive(desc);        // update existing organLeaf
    } else {
      this.createChildByKey(key);
    }
  },

  vanish: function() {
    this.organ.vanish();
    this.vanishAllChildren();
    this.clearUp();
  },
};

module.exports = {
  OrganNode,
};
