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

class Parasite {
  constructor({organ, index}) {
    this.setUp({organ, index});
  }
  setUp(props) {
    Object.assign(this, {
      organ: null,
      index: null,
      deps: null,

      hasSet: false,
      attaching: false,
      attached: false,
      toDetach: null,
      detaching: false,

      value: null,
    }, props);
  }
  clearUp() {
    this.setUp();
  }
  setValue(value) {
    this.hasSet = true;
    this.value = value;
  }
  firstGive(value) {
    return this.hasSet ? this.value : this.give(value);
  }
  give(value) {
    this.setValue(value);
    return this.value;
  }
  asyncGive(value) {
    if (!this.organ) {
      throw new Error(ASYNC_GIVE_AFTER_DETACH_ERROR_MESSAGE);
    }
    if (this.detaching) {
      throw new Error(ASYNC_GIVE_IN_DETACH_ERROR_MESSAGE);
    }
    Lakhesis.givingParasite = this;

    const oldValue = this.value;
    this.setValue(value);

    const organUpdateNeeded = !this.attaching && !shallowEqual(oldValue, this.value);
    if (organUpdateNeeded) {
      this.organ.update();
    }

    Lakhesis.givingParasite = null;
    return this;
  }
  receiveDeps(deps) {
    this.attachable = !shallowEqual(deps, this.deps);
    this.deps = deps;
    return this;
  }
  attach(toAttach) {
    if (this.attached && !this.attachable) {
      return this;
    }
    const handover = this.detach();
    this.attaching = true;
    if (typeof toAttach === 'function') {
      this.toDetach = toAttach(this.deps, this.asyncGive.bind(this), {handover});
    } else {
      this.setValue(toAttach);
      this.toDetach = () => this.setValue(null);
    }
    this.attaching = false;
    this.attached = true;
    return this;
  }
  detach({ending = false} = {}) {
    let handover;
    this.detaching = true;
    if (typeof this.toDetach === 'function') {
      handover = this.toDetach({ending});
      this.toDetach = null;
    }
    this.detaching = false;
    return handover;
  }
  vanish() {
    const handover = this.detach({ending: true});
    if (handover !== undefined) {
      throw new Error(LEAVE_HANDOVER_AT_THE_ENDING);
    }
    this.clearUp();
  }
}

module.exports = {
  Parasite,
  ASYNC_GIVE_AFTER_DETACH_ERROR_MESSAGE,
  ASYNC_GIVE_IN_DETACH_ERROR_MESSAGE,
  LEAVE_HANDOVER_AT_THE_ENDING,
};
