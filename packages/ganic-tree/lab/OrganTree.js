const { Organ } = require('ganic');
const { OrganNode } = require('./OrganNode');
const { OrganLeaf } = require('./OrganLeaf');
const { createNode, List } = require('./utils');
const { addTree, removeTree } = require('./wood');

class OrganTree {
  constructor({organDesc, envRoot, envRunner}) {
    this.organDesc = organDesc;
    this.trunkNode = null;
    this.envRoot = envRoot;
    this.envRunner = envRunner;

    addTree(this);
    this.grow();
  }
  clearUp() {
    this.organDesc = null;
    this.trunkNode = null;
    this.envRoot = null;
    this.envRunner = null;
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

  vanish() {
    removeTree(this);
    this.trunkNode.vanish();
    this.clearUp();
  }
}

module.exports = {
  OrganTree,
};
