
class Connector {
  constructor(relationship = {}) {
    this.setUpRelationship();
    this.buildRelationship(relationship);
  }

  setUpRelationship(config) {
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

  clearUpRelationship() {
    this.setUpRelationship();
  }

  buildRelationship({key, parent, isFirst, isLast, preSibling} = {}) {
    if (preSibling) {
      this.preSibling = preSibling;
      this.nextSibling = preSibling.nextSibling;
      preSibling.nextSibling = this;
      if (this.nextSibling) {
        this.nextSibling.preSibling = this;
      }
    }
    if (parent) {
      this.key = key;
      this.parent = parent;
      parent.children[key] = this;
      if (isFirst && parent.firstChild !== this) {
        const oldFirstChild = parent.firstChild;
        parent.firstChild = this;
        if (oldFirstChild) {
          oldFirstChild.preSibling = this;
          this.nextSibling = oldFirstChild;
        }
      }
      if (isLast && parent.lastChild !== this) {
        const oldLastChild = parent.lastChild;
        parent.lastChild = this;
        if (oldLastChild) {
          oldLastChild.nextSibling = this;
          this.preSibling = oldLastChild;
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
    this.clearUpRelationship();
  }
}

module.exports = {
  Connector,
};
