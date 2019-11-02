'use strict';

const {shallowEqual} = require('./utils');
const Lakhesis = require('./moirai/Lakhesis');

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
  firstYield: function(excrement) {
    return this.hasExcreted ? this.latestExcrement : this.give(excrement);
  },
  give: function(excrement) {
    this.setExcrement(excrement);
    return this.latestExcrement;
  },
  asyncGive: function(excrement) {
    this.setExcrement(excrement);
    if (!this.attaching) {
      Lakhesis.givingParasite = this;
      this.organ.update();
      Lakhesis.givingParasite = null;
    }
    return this;
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
    const handover = this.detach();
    this.attaching = true;
    if (typeof toAttach === 'function') {
      this.toDetach = toAttach(this.deps, this.asyncGive.bind(this), {handover});
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
      return this.toDetach();
    }
  },
};

module.exports = {
  Parasite,
};
