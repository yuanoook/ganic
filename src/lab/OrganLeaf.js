'use strict';

const { buildRelationship, vanishRelationship } = require('./utils');

/**
 * OrganLeaf does not have any children
 * It's the end node for a non-organ-desc variable
 */

class OrganLeaf {
  constructor({value, parent, tree, key, relationship}) {
    this.setUp({value, parent, tree, key});
    this.buildRelationship(relationship);
  }

  setUp(config) {
    Object.assign(this, {
      value: null,
      parent: null,
      tree: null,
      preSibling: null,
      nextSibling: null,
    }, config);
  }
  clearUp() {
    this.setUp();
  }
  update() {
    if (this.tree) {
      this.tree.envUtils.updateLeaf(this);
    }
  }
  receive(value) {
    if (this.value !== value) {
      this.value = value;
      this.update();
    }
  }

  buildRelationship(relationship) {
    buildRelationship(this, relationship);
  }

  vanishRelationship() {
    vanishRelationship(this);
  }

  vanish() {
    if (this.tree) {
      this.tree.envUtils.vanishLeaf(this);
    }
    this.vanishRelationship();
    this.clearUp();
  }
}

module.exports = {
  OrganLeaf,
};
