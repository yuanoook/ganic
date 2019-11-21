const { Organ } = require('ganic');
const { OrganNode } = require('./OrganNode');
const { OrganLeaf } = require('./OrganLeaf');
const { createNode, List } = require('./utils');

/**
 * OrganTree connects the root OrganNode with the environment
 * It takes environment configuration
 *    basic platform-native-organism
 *    they environment proxy
 */

class OrganTree {
  constructor({organDesc, envRoot, envRunner}) {
    this.setUp({
      organDesc,
      envRoot,
      envRunner,
    });
    this.grow();
  }

  setUp(config) {
    Object.assign(this, {
      organDesc: null,
      trunkNode: null,
      envRoot: null,
      envRunner: null,
    }, config);
  }
  update(organDesc) {
    this.organDesc = organDesc;
    this.trunkNode.organ.receive(organDesc);
  }
  grow() {
    const trunkDesc = {organism: List, props: this.organDesc};
    const {node, onReady} = createNode({
      constructors: {
        Organ,
        OrganNode,
        OrganLeaf,
      },
      desc: trunkDesc,
      tree: this,
    });
    this.trunkNode = node;
    if (typeof onReady === 'function') {
      onReady(node);
    }
  }

  clearUp() {
    this.setUp();
  }

  vanish() {
    this.trunkNode.vanish();
    this.clearUp();
  }
}

module.exports = {
  OrganTree,
};
