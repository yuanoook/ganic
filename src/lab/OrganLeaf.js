'use strict';

const { buildRelationship, vanishRelationship } = require('./utils');

/**
 * OrganLeaf does not have any children
 * It's the end node for a non-organ-desc variable
 */

const OrganLeaf = function({value, parent, tree, key}) {
  this.setUp({value, parent, tree, key});
  this.update();
};

OrganLeaf.prototype = {
  setUp: function(config) {
    Object.assign(this, {
      value: null,
      parent: null,
      tree: null,
      preSibling: null,
      nextSibling: null,
    }, config);
  },
  clearUp: function() {
    this.setUp();
  },
  update: function() {
    if (this.tree) {
      this.tree.envUtils.updateLeaf(this);
    }
  },
  receive: function(value) {
    this.value = value;
    this.update();
  },

  buildRelationship: function(relationship) {
    buildRelationship(this, relationship);
  },

  vanishRelationship: function() {
    vanishRelationship(this);
  },

  vanish: function() {
    if (this.tree) {
      this.tree.envUtils.vanishLeaf(this);
    }
    this.vanishRelationship();
    this.clearUp();
  },
};

module.exports = {
  OrganLeaf,
};
