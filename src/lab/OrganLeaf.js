'use strict';

/**
 * OrganLeaf does not have any children
 * It's the end node for a non-organ-desc variable
 */

const OrganLeaf = function({value, parent, tree}) {
  this.setUp({value, parent, tree});
  this.update();
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
  update: function() {
    if (this.tree) {
      this.tree.envUtils.updateLeaf(this);
    }
  },
  receive: function(value) {
    this.value = value;
    this.update();
  },
  vanish: function() {
    if (this.tree) {
      this.tree.envUtils.removeLeaf(this);
    }
    this.clearUp();
  },
};

module.exports = {
  OrganLeaf,
};
