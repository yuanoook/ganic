'use strict';

const { Organ } = require('./Organ');
const { OrganNode } = require('./OrganNode');
const { getOrganismByDesc } = require('./utils');
const basicUI = require('../env/basic');

/**
 * OrganTree connects the root OrganNode with the environment
 * It takes environment configuration
 *    basic platform-native-organism
 *    they environment proxy
 */

const OrganTree = function({organDesc, envRoot, envUtils = basicUI}) {
  this.setUp({organDesc, envRoot, envUtils});
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
    const organism = getOrganismByDesc(this.organDesc, this);
    const organ = new Organ({organism, props: this.organDesc.props});
    this.trunkNode = new OrganNode({organ, tree: this});
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
