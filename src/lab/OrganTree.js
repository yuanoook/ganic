'use strict';

/**
 * OrganTree connects the root OrganNode with the native environment
 * It takes environment configuration
 *    basic string-organism
 *    they native environment proxy
 */

const OrganTree = function({organDesc, root, getOrganism}) {
  // TODO: accept organDesc
  // TODO: use configurable string-organism

  this.setUp({organDesc, root});
};

OrganTree.prototype = {
  setUp: function(props) {
    Object.assign(this, {
      organDesc: null,
      root: null,
    }, props);
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
