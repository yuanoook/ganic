'use strict';

const { Organ } = require('./Organ');
const { OrganNode } = require('./OrganNode');
const { basicUI } = require('../env/basicUI');

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
    const {organism, props} = this.organDesc;
    const organ = new Organ({organism, props});
    this.trunkNode = new OrganNode({organ, tree: this});
  },

  clearUp: function() {
    this.setUp();
  },

  vanish: function() {
    this.clearUp();
  },
};

module.exports = {
  OrganTree,
};
