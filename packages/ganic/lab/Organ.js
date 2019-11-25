const {Parasite} = require('./Parasite');
const {shallowEqual} = require('./utils');
const Lakhesis = require('../moirai/Lakhesis');

class Organ {
  constructor({organism, props}) {
    if (typeof organism !== 'function') {
      throw new Error('To create an Organ, organism must be a function!');
    }

    this.organism = organism;
    this.props = props;
    this.result = null;
    this.parasites = [];
    this.parasiteCheckingIndex = 0;
    this.listeners = [];
    this.update();
  }
  clearUp() {
    this.organism = null;
    this.props = null;
    this.result = null;
    this.parasites.length = 0;
    // this.parasiteCheckingIndex = 0;
    this.listeners.length = 0;
  }

  receive(props) {
    if (!shallowEqual(this.props, props)) {
      this.props = props;
      this.update();
    }
    return this;
  }
  update() {
    Lakhesis.setUpdatingOrgan(this);
    this.parasiteCheckingIndex = 0;

    const oldResult = this.result;
    this.result = this.organism(this.props);
    const changeDetected = !shallowEqual(oldResult, this.result);
    if (changeDetected) {
      this.wakeListeners();
    }

    Lakhesis.clearUpdatingOrgan(this);
    return this;
  }

  getParasite(index) {
    const parasite = this.parasites[index];
    if (parasite) {
      return parasite;
    }
    this.parasites[index] = new Parasite(this);
    return this.parasites[index];
  }
  take(deps) {
    const parasite = this.getParasite(this.parasiteCheckingIndex);
    parasite.receiveDeps(deps);
    this.parasiteCheckingIndex++;

    return parasite;
  }
  attach(parasitism, deps, firstValue) {
    return this.take(deps)
      .attach(parasitism)
      .firstGive(firstValue);
  }
  removeAllParasites() {
    this.parasites.forEach(parasite => parasite.vanish());
    this.parasites.length = 0;
  }

  addListener(func) {
    this.listeners.push(func);
    func(this.result);
    return this;
  }
  removeListner(listener) {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
  }
  wakeListeners() {
    this.listeners.forEach(func => func(this.result));
    return this;
  }
  removeAllListners() {
    this.listeners.length = 0;
  }

  vanish() {
    this.removeAllParasites();
    this.removeAllListners();
    this.clearUp();
  }
}

module.exports = {
  Organ,
};
