
const { Connector } = require('./Connector');

/**
 * OrganLeaf does not have any children
 * It's the end node for a non-organ-desc variable
 */

class OrganLeaf extends Connector {
  constructor({value, tree, key, relationship}) {
    super({key, ...relationship});
    this.setUp({value, tree});
  }

  setUp(config) {
    Object.assign(this, {
      value: null,
      tree: null,
      children: null,
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

  vanish() {
    if (this.tree) {
      this.tree.envUtils.vanishLeaf(this);
    }
    super.vanish();
    this.clearUp();
  }
}

module.exports = {
  OrganLeaf,
};
