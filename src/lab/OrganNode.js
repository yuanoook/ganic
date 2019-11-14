'use strict';
/* eslint-disable no-multi-spaces */

const { Organ } = require('./Organ');
const { OrganLeaf } = require('./OrganLeaf');
const { flat, getUtilsByDesc, createNode, buildRelationship, vanishRelationship } = require('./utils');

/**
 * OrganNode is the wrapper for one organ
 * It handles the parent - children relationship things
 * It manages the update of its children
 */

const OrganNode = function({organ, parent, tree, key}) {
  this.setUp({organ, parent, tree, key});
  this.update = this.update.bind(this);
  this.vanishChild = this.vanishChild.bind(this);
  this.updateChild = this.updateChild.bind(this);
  organ.addListener(this.update);
};

OrganNode.prototype = {
  setUp: function(config) {
    Object.assign(this, {
      organ: null,
      parent: null,
      tree: null,
      key: null,

      descs: [],
      descKeys: [],
      children: {},

      preSibling: null,
      nextSibling: null,
      firstChild: null,
      lastChild: null,
    }, config);
  },
  clearUp: function() {
    this.setUp();
  },

  update: function() {
    this.descs = this.parseDescs();
    this.descKeys = this.getDescKeys();
    const childrenKeys = Object.keys(this.children);
    const toVanishKeys = childrenKeys.filter(x => !this.descKeys.includes(x));

    toVanishKeys.forEach(this.vanishChild);
    this.descs.forEach(this.updateChild);
  },

  parseDescs: function() {
    const descs = Array.isArray(this.organ.result) ? this.organ.result : [this.organ.result];
    return flat(descs, Infinity);
  },
  getDescKeys: function() {
    return this.descs.map((desc, index) => {
      const hasKey = desc
        && desc.props
        && desc.props.hasOwnProperty('key')
        && desc.props.key !== undefined
        && desc.props.key !== null;
      return hasKey ? String(desc.props.key) : String(index);
    });
  },
  getChildPreSibling: function(index) {
    const preIndex = index - 1;
    if (preIndex < 0) {
      return null;
    }
    const preKey = this.descKeys[preIndex];
    return this.children[preKey];
  },

  vanishChild: function(key) {
    if (this.children[key]) {
      this.children[key].vanish();
    }
  },
  vanishAllChildren: function() {
    const childrenKeys = Object.keys(this.children);
    childrenKeys.forEach(key => this.vanishChild(key));
  },
  updateChild: function(desc, index) {
    const key = this.descKeys[index];
    const { organism } = getUtilsByDesc(desc, this.tree) || {};
    const isDescLeaf = !organism;

    let child = this.children[key];
    const isChildNode = child instanceof OrganNode;
    const isChildLeaf = child instanceof OrganLeaf;

    if (isChildNode && organism && child.organ.organism === organism) {
      debugger;
      child.organ.receive(desc.props); // update existing same type organNode
    } else if (isChildLeaf && isDescLeaf) {
      debugger;
      child.receive(desc);             // update existing organLeaf
    } else {
      debugger;
      child = this.createChild(desc, index);
    }
    // TODO: relocation check

    return child;
  },
  createChild: function(desc, index) {
    const key = this.descKeys[index];
    this.vanishChild(key);
    const isFirst = index === 0;
    const {node, onReady} = createNode({
      constructors: {
        Organ,
        OrganNode,
        OrganLeaf,
      },

      desc,
      parent: this,
      tree: this.tree,
      key,

      isFirst: isFirst,
      isLast: index === this.descKeys.length - 1,
      preSibling: isFirst ? null : this.getChildPreSibling(index),
    });
    this.children[key] = node;
    if (typeof onReady === 'function') {
      onReady(node);
    }
    return node;
  },

  buildRelationship: function(relationship) {
    buildRelationship(this, relationship);
  },

  vanishRelationship: function() {
    vanishRelationship(this);
  },

  vanish: function() {
    this.organ.vanish();
    this.vanishAllChildren();
    this.vanishRelationship();
    this.clearUp();
  },
};

module.exports = {
  OrganNode,
};
