const { Connector } = require('./Connector');

/**
 * OrganLeaf does not have any children
 * It's the end node for a non-organ-desc variable
 */

class OrganLeaf extends Connector {
  constructor({value, tree, relationship}) {
    super(relationship);
    this.value = value === false ? undefined : value;
    this.tree = tree;
  }
  clearUp() {
    this.value = null;
    this.tree = null;
  }
  update() {
    if (this.tree) {
      this.tree.envRunner.updateLeaf(this);
    }
  }
  receive(value) {
    if (this.value !== value) {
      this.value = value === false ? undefined : value;
      this.update();
    }
  }
  vanish() {
    if (this.tree) {
      this.tree.envRunner.vanishLeaf(this);
    }
    super.vanish();
    this.clearUp();
  }
}

module.exports = {
  OrganLeaf,
};
