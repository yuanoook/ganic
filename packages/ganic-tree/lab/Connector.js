class Connector {
  constructor(relationship) {
    this.key = null;
    this.parent = null;
    this.preSibling = null;
    this.nextSibling = null;
    // this.children = {};
    this.firstChild = null;
    this.lastChild = null;
    this.buildRelationship(relationship);
  }
  clearUpRelationship() {
    this.key = null;
    this.parent = null;
    this.preSibling = null;
    this.nextSibling = null;
    // this.children = null;
    this.firstChild = null;
    this.lastChild = null;
  }

  buildRelationship(relationship) {
    if (!relationship) {
      return;
    }
    const {key, parent, isFirst, isLast, preSibling} = relationship;
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
