'use strict';

const { Organ } = require('./Organ');
const { OrganNode } = require('./OrganNode');
const { OrganLeaf } = require('./OrganLeaf');
const { createNode, List } = require('./utils');

/**
 * OrganTree connects the root OrganNode with the environment
 * It takes environment configuration
 *    basic platform-native-organism
 *    they environment proxy
 */

const OrganTree = function({organDesc, envRoot, envUtils}) {
  this.setUp({
    organDesc: !Array.isArray(organDesc) ? organDesc : {organism: List, props: organDesc},
    envRoot,
    envUtils,
  });
  this.grow();
};

OrganTree.prototype = {
  setUp: function(config) {
    Object.assign(this, {
      organDesc: null,
      trunkNode: null,
      envRoot: null,
      envUtils: null,
    }, config);
  },
  grow: function() {
    const {node, onReady} = createNode({
      constructors: {
        Organ,
        OrganNode,
        OrganLeaf,
      },
      desc: this.organDesc,
      tree: this,
    });
    this.trunkNode = node;
    if (typeof onReady === 'function') {
      onReady(node);
    }
  },

  clearUp: function() {
    this.setUp();
  },

  vanish: function() {
    this.trunkNode.vanish();
    this.clearUp();
  },
};

module.exports = {
  OrganTree,
};
