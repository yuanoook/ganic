'use strict';

/**
 * OrganLeaf does not have any children
 * It's the end node for a non-organ-desc variable
 */

const OrganLeaf = function({value, parent}) {
  this.setUp({value, parent});
};

OrganLeaf.prototype = {
  setUp: function(props) {
    Object.assign(this, {
      value: null,
      parent: null,
    }, props);
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
