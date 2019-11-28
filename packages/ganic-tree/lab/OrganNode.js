/* eslint-disable no-multi-spaces */
const { Connector } = require('./Connector');
const { Organ } = require('ganic');
const { OrganLeaf } = require('./OrganLeaf');
const { List, getOrganKit, createNode } = require('./utils');

/**
 * OrganNode is the wrapper for one organ
 * It handles the parent - children relationship things
 * It manages the update of its children
 */

class OrganNode extends Connector {
  constructor({organ, tree, index, relationship}) {
    super(relationship);

    this.organ = organ;
    this.tree = tree;
    this.index = index;
    this.updating = false;
    this.vanishing = false;
    this.children = {};
    this.descs = [];
    this.descKeys = [];

    this.update = this.update.bind(this);
    this.vanishChild = this.vanishChild.bind(this);
    this.updateChild = this.updateChild.bind(this);

    organ.addListener(this.update);
  }
  clearUp() {
    this.organ = null;
    this.tree = null;
    // this.index = 0;
    // this.updating = false;
    // this.vanishing = false;
    // this.children = null;
    this.descs.length = 0;
    this.descKeys.length = 0;
  }

  update() {
    this.updating = true;

    this.descs = this.parseDescs();
    this.descKeys = this.getDescKeys();
    const childrenKeys = Object.keys(this.children);
    const toVanishKeys = childrenKeys.filter(x => !this.descKeys.includes(x));
    toVanishKeys.forEach(this.vanishChild);
    this.descs.forEach(this.updateChild);

    this.updating = false;
    if ((!this.parent || !this.parent.updating) && this.tree) {
      this.tree.envRunner.onSettled(this);
    }
  }

  parseDescs() {
    if (this.organ.result === undefined || this.organ.result === null) {
      return [];
    }
    const descs = Array.isArray(this.organ.result) ? this.organ.result : [this.organ.result];
    return descs.map(desc =>
      !Array.isArray(desc) ? desc : {organism: List, props: desc},
    );
  }

  getDescKeys() {
    return this.descs.map((desc, index) => {
      const hasKey = desc
        && desc.props
        && desc.props.hasOwnProperty('key')
        && desc.props.key !== undefined
        && desc.props.key !== null;
      return hasKey ? String(desc.props.key) : String(index);
    });
  }

  getChildPreSibling(index) {
    const preIndex = index - 1;
    if (preIndex < 0) {
      return null;
    }
    const preKey = this.descKeys[preIndex];
    return this.children[preKey];
  }

  vanishChild(key) {
    if (this.children[key]) {
      this.children[key].vanish();
    }
  }

  vanishAllChildren() {
    const childrenKeys = Object.keys(this.children);
    childrenKeys.forEach(key => this.vanishChild(key));
  }

  updateChild(desc, index) {
    const key = this.descKeys[index];
    const { organism } = getOrganKit(desc, this.tree) || {};
    const isDescLeaf = !organism;

    const child = this.children[key];
    const isChildNode = child instanceof OrganNode;
    const isChildLeaf = child instanceof OrganLeaf;
    if (isChildNode && organism && child.organ.organism === organism) {
      if (index !== child.index) {
        child.index = index;
        this.relocateChild(child, index);
      }
      child.organ.receive(desc.props); // update existing same type organNode
    } else if (isChildLeaf && isDescLeaf) {
      child.receive(desc);             // update existing organLeaf
    } else {
      this.createChild(desc, index);
    }
  }

  createChild(desc, index) {
    const key = this.descKeys[index];
    this.vanishChild(key);
    const isFirst = index === 0;
    const {node, onReady} = createNode({
      constructors: {
        Organ,
        OrganNode,
        OrganLeaf,
      },

      desc,
      parent: this,
      tree: this.tree,
      index,
      relationship: {
        key,
        parent: this,
        isFirst: isFirst,
        isLast: index === this.descKeys.length - 1,
        preSibling: isFirst ? null : this.getChildPreSibling(index),
      },
    });
    if (typeof onReady === 'function') {
      onReady(node);
    }
  }

  relocateChild(child, index) {
    const isFirst = index === 0;
    const preSibling = isFirst ? null : this.getChildPreSibling(index);
    if (child.preSibling !== preSibling) {
      child.vanishRelationship();
      child.buildRelationship({
        key: this.descKeys[index],
        parent: this,
        isFirst: index === 0,
        isLast: index === this.descKeys.length - 1,
        preSibling,
      });
      this.tree.envRunner.relocate(child);
    }
  }

  vanish() {
    this.vanishing = true;
    const onBuried = (!this.parent || !this.parent.vanishing)
      && this.tree
      && this.tree.envRunner.onBuried;

    this.organ.vanish();
    this.vanishAllChildren();
    super.vanish();
    this.clearUp();

    if (onBuried) {
      onBuried(this);
    }
  }
}

module.exports = {
  OrganNode,
};
