'use strict';

const {shallowEqual} = require('./utils');
const Lakhesis = require('../moirai/Lakhesis');

const ASYNC_GIVE_AFTER_DETACH_ERROR_MESSAGE = `
  This parasite has been detached from it's organ.
  There should be no more giving behavior.
  Clean job hasn't been set up properly in the parasitism.
`;

const ASYNC_GIVE_IN_DETACH_ERROR_MESSAGE = `
  Don't call give inside detach function.
`;

const LEAVE_HANDOVER_AT_THE_ENDING = `
  Don't leave handover at the ending of a parasite.
`;

const Parasite = function({organ, index}) {
  this.setUp({organ, index});
};

Parasite.prototype = {
  setUp: function(props) {
    Object.assign(this, {
      organ: null,
      index: null,
      deps: null,
      hasExcreted: false,
      attaching: false,
      attached: false,
      toDetach: null,
      detaching: false,
      lastExcrement: null,
    }, props);
  },
  clearUp: function() {
    this.setUp();
  },

  setExcrement: function(excrement) {
    this.hasExcreted = true;
    this.lastExcrement =
      typeof excrement === 'function'
        ? excrement(this.lastExcrement)
        : excrement;
  },
  firstGive: function(excrement) {
    return this.hasExcreted ? this.lastExcrement : this.give(excrement);
  },
  give: function(excrement) {
    this.setExcrement(excrement);
    return this.lastExcrement;
  },
  asyncGive: function(excrement) {
    if (!this.organ) {
      throw new Error(ASYNC_GIVE_AFTER_DETACH_ERROR_MESSAGE);
    }
    if (this.detaching) {
      throw new Error(ASYNC_GIVE_IN_DETACH_ERROR_MESSAGE);
    }
    Lakhesis.givingParasite = this;

    const oldExcrement = this.lastExcrement;
    this.setExcrement(excrement);

    const organUpdateNeeded = !this.attaching && !shallowEqual(oldExcrement, this.lastExcrement);
    if (organUpdateNeeded) {
      this.organ.update();
    }

    Lakhesis.givingParasite = null;
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
  detach: function({ending = false} = {}) {
    let handover;
    this.detaching = true;
    if (typeof this.toDetach === 'function') {
      handover = this.toDetach({ending});
      this.toDetach = null;
    }
    this.detaching = false;
    return handover;
  },

  vanish: function() {
    const handover = this.detach({ending: true});
    if (handover !== undefined) {
      throw new Error(LEAVE_HANDOVER_AT_THE_ENDING);
    }
    this.clearUp();
  },
};

module.exports = {
  Parasite,
  ASYNC_GIVE_AFTER_DETACH_ERROR_MESSAGE,
  ASYNC_GIVE_IN_DETACH_ERROR_MESSAGE,
};
