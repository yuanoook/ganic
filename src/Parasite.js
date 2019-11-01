'use strict';

const {shallowEqual} = require('./etc/utils');

const Parasite = function({organ}) {
  Object.assign(this, {
    organ,
    deps: null,
    hasExcreted: false,
    attaching: false,
    attached: false,
    toDetach: null,
    latestExcrement: null,
  });
};

Parasite.prototype = {
  setExcrement(excrement) {
    this.hasExcreted = true;
    this.latestExcrement =
      typeof excrement === 'function'
        ? excrement(this.latestExcrement)
        : excrement;
  },
  firstGive: function(excrement) {
    return this.hasExcreted ? this.latestExcrement : this.give(excrement);
  },
  give: function(excrement) {
    this.setExcrement(excrement);
    return this.latestExcrement;
  },
  asyncGive: function(excrement) {
    this.setExcrement(excrement);
    if (!this.attaching) {
      this.organ.update();
    }
  },
  receiveDeps: function(deps) {
    this.attachable = !shallowEqual(deps, this.deps);
    this.deps = deps;
    return this;
  },
  attach: function(toAttach) {
    if (this.attached && !this.attachable) {
      return this;
    }
    this.detach();
    this.attaching = true;
    if (typeof toAttach === 'function') {
      this.toDetach = toAttach(this.deps, this.asyncGive.bind(this), this);
    } else {
      this.setExcrement(toAttach);
      this.toDetach = () => this.setExcrement(null);
    }
    this.attaching = false;
    this.attached = true;
    return this;
  },
  detach: function() {
    if (typeof this.toDetach === 'function') {
      this.toDetach();
    }
  },
};

module.exports = {
  Parasite,
};
