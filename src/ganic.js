const { shallowEqual } = require('./utils')

let operatingOrgan
exports.take = function(deps) {
  if (!operatingOrgan) throw "Don't use TAKE outside of organism!"
  return operatingOrgan.take(deps)
}

const create = organism => {
  const organ = {
    organism,
    pheno: null,

    props: null,
    receiveProps: function(props) {
      if (shallowEqual(this.props, props)) return

      this.props = props
      this.operate()
    },
    operate: function() {
      operatingOrgan = this
      this.run()
      operatingOrgan = null
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

      this.parasites[index] = {
        organ: this,

        hasExcreted: false,
        attaching: false,
        attached: false,
        toDetach: null,

        latestExcrement: null,
        setExcrement(excrement) {
          this.hasExcreted = true
          this.latestExcrement = typeof excrement === 'function'
            ? excrement(this.latestExcrement)
            : excrement
        },
        firstGive: function(excrement) {
          return this.hasExcreted
            ? this.latestExcrement
            : this.give(excrement)
        },
        give: function(excrement) {
          this.setExcrement(excrement)
          return this.latestExcrement
        },
        // todo: make multiple asyncGive as one, just like what setState in React
        asyncGive: function(excrement) {
          this.setExcrement(excrement)
          if (!this.attaching) this.organ.operate()
        },

        deps: null,
        receiveDeps: function(deps) {
          this.attachable = !shallowEqual(deps, this.deps)
          this.deps = deps
          return this
        },
        attach: function(toAttach) {
          if (this.attached && !this.attachable) return this
          this.detach()
          this.attaching = true
          if (typeof toAttach === 'function') {
            this.toDetach = toAttach(this.deps, this.asyncGive.bind(this))
          } else {
            this.setExcrement(toAttach)
            this.toDetach = () => this.setExcrement(null)
          }
          this.attaching = false
          this.attached = true
          return this;
        },
        detach: function() {
          if (typeof this.toDetach === 'function') this.toDetach()
        }
      }

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

  return organ;
}

let organ;
exports.live = function(organism, props) {
  const isSameOrganism = organ && organ.organism === organism
  organ = isSameOrganism ? organ : create(organism);
  organ.receiveProps(props);
  return organ;
}
