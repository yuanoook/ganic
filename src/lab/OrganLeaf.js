'use strict';

/**
 * OrganLeaf does not have any children
 * It's the end node for a non-organ-desc variable
 */

const OrganLeaf = function({value, parent, tree}) {
  this.setUp({value, parent, tree});
};

OrganLeaf.prototype = {
  setUp: function(config) {
    Object.assign(this, {
      value: null,
      parent: null,
      tree: null,
    }, config);
  },
  clearUp: function() {
    this.setUp();
  },
  receive: function(value) {
    this.value = value;
  },
  vanish: function() {
    this.clearUp();
  },
};

module.exports = {
  OrganLeaf,
};
