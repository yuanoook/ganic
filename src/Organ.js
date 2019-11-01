const { Parasite } = require('./Parasite')
const { shallowEqual } = require('./etc/utils')
const SINGLETON = require('./etc/singleton')

const Organ = function({ organism }) {
  if (typeof organism !== 'function') throw "To create an Organ, organism must be a function!"
  Object.assign(this, {
    organism,
    pheno: null,
    props: null,
    parasites: [],
    parasiteCheckingIndex: 0,
    onExcreteListeners: []
  })
}

Organ.prototype = {
  receiveProps: function(props) {
    if (shallowEqual(this.props, props)) return this
    this.props = props
    this.operate()
  },
  operate: function() {
    SINGLETON.operatingOrgan = this
    this.run()
    SINGLETON.operatingOrgan = null
    return this
  },
  run: function() {
    this.parasiteCheckingIndex = 0
    this.pheno = this.organism(this.props)
    this.triggerExcrete()
  },
  getParasite(index) {
    const parasite = this.parasites[index]
    if (parasite) return parasite

    this.parasites[index] = new Parasite({ organ: this })
    return this.parasites[index]
  },
  take: function(deps) {
    const parasite = this.getParasite(this.parasiteCheckingIndex)
    parasite.receiveDeps(deps)
    this.parasiteCheckingIndex ++

    return parasite
  },
  attach: function(parasitism, deps, firstExcrement) {
    return this.take(deps).attach(parasitism).firstGive(firstExcrement)
  },
  onExcrete: function(func) {
    this.onExcreteListeners.push(func)
    func(this.pheno)
    return this
  },
  triggerExcrete: function() {
    this.onExcreteListeners.forEach(func => func(this.pheno))
    return this
  }
}

module.exports = {
  Organ
}
