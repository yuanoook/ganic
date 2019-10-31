const { Parasite } = require('./Parasite')
const {
  shallowEqual,
  SINGLETON
} = require('./utils')

const Organ = function({ organism }) {
  if (typeof organism !== 'function') throw "To create an Organ, organism must be a function!"
  this.organism = organism
}

Organ.prototype = {
  organism: null,
  pheno: null,

  props: null,
  receiveProps: function(props) {
    if (shallowEqual(this.props, props)) return

    this.props = props
    this.operate()
  },
  operate: function() {
    SINGLETON.operatingOrgan = this
    this.run()
    SINGLETON.operatingOrgan = null
  },
  run: function() {
    this.parasiteCheckingIndex = 0
    this.pheno = this.organism(this.props)
    this.triggerExcrete()
  },

  parasites: [],
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

  onExcreteListeners: [],
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
