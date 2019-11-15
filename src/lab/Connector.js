'use strict';

class Connector {
  constructor(relationship = {}) {
    this.setUp({
      firstChild: null,
      lastChild: null,
    });
    this.buildRelationship(relationship);
  }

  setUp(config) {
    Object.assign(this, {
      key: null,
      parent: null,

      preSibling: null,
      nextSibling: null,

      children: {},
      firstChild: null,
      lastChild: null,
    }, config);
  }

  clearUp() {
    this.setUp();
  }

  buildRelationship({key, parent, isFirst, isLast, preSibling} = {}) {
    this.key = key;
    this.preSibling = preSibling || null;
    if (preSibling) {
      this.nextSibling = preSibling.nextSibling || null;
      preSibling.nextSibling = this;
      if (this.nextSibling) {
        this.nextSibling.preSibling = this;
      }
    }
    if (parent) {
      this.parent = parent;
      parent.children[key] = this;
      if (isFirst && parent.firstChild !== this) {
        const oldFirstChild = parent.firstChild;
        parent.firstChild = this;
        if (oldFirstChild) {
          oldFirstChild.preSibling = this;
        }
      }
      if (isLast && parent.lastChild !== this) {
        const oldLastChild = parent.lastChild;
        parent.lastChild = this;
        if (oldLastChild) {
          oldLastChild.nextSibling = this;
        }
      }
    }
  }

  vanishRelationship() {
    if (this.preSibling) {
      this.preSibling.nextSibling = this.nextSibling;
    }
    if (this.nextSibling) {
      this.nextSibling.preSibling = this.preSibling;
    }
    if (!this.parent) {
      this.parent = null;
      return;
    }
    if (this.parent.firstChild === this) {
      this.parent.firstChild = this.nextSibling;
    }
    if (this.parent.lastChild === this) {
      this.parent.lastChild = this.preSibling;
    }
    if (this.parent.children[this.key] === this) {
      delete this.parent.children[this.key];
    }
    this.parent = null;
  }

  vanish() {
    this.vanishRelationship();
    this.clearUp();
  }
}

module.exports = {
  Connector,
};
