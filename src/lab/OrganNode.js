'use strict';
/* eslint-disable no-multi-spaces */

const { Organ } = require('./Organ');
const { OrganLeaf } = require('./OrganLeaf');
const { flat, getUtilsByDesc, createNode } = require('./utils');

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
    const toVanishKeys = childrenKeys.filter(x => !descKeys.includes(x));
    toVanishKeys.forEach(key => this.vanishChildByKey(key));
    descKeys.forEach(key => this.updateChildByKey(key));
  },

  parseDescs: function() {
    const descs = Array.isArray(this.organ.result) ? this.organ.result : [this.organ.result];
    return flat(descs, Infinity);
  },
  getDescKeys: function() {
    return this.descs.map((desc, index) => {
      const key = desc && desc.props && desc.props.key;
      return (key !== undefined && key !== null) ? key : String(index);
    });
  },
  getDescByKey: function(key) {
    return this.descs.find((desc, index) => {
      const descKey = desc && desc.props && desc.props.key;
      return key === descKey || key === String(index);
    });
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
  updateChildByKey: function(key) {
    const desc = this.getDescByKey(key);
    const { organism } = getUtilsByDesc(desc, this.tree) || {};
    const isDescLeaf = !organism;
  
    const child = this.children[key];
    const isChildNode = child instanceof OrganNode;
    const isChildLeaf = child instanceof OrganLeaf;

    if (isChildNode && organism && child.organ.organism === organism) {
      child.organ.receive(desc.props); // update existing same type organNode
    } else if (isChildLeaf && isDescLeaf) {
      child.receive(desc);             // update existing organLeaf
    } else {
      this.createChildByKey(key);
    }
  },
  createChildByKey: function(key) {
    this.vanishChildByKey(key);
    const desc = this.getDescByKey(key);
    const {node, onReady} = createNode({
      constructors: {
        Organ,
        OrganNode,
        OrganLeaf,
      },
      desc,
      parent: this,
      tree: this.tree,
    });
    this.children[key] = node;
    if (typeof onReady === 'function') {
      onReady(node);
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
