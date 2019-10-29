const shallowEqual = (a, b) => {
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object' ) return a === b
  return !Object.keys(Object.assign({}, a, b)).find((key) => a[key] !== b[key])
}

let operatingOrgan
exports.take = function(deps) {
  if (!operatingOrgan) return console.warn(`
    Don't try to call the organFn by yourself!
    Call organ.operate instead!
    Let organicJs to handle this!
  `)
  return operatingOrgan.take(deps)
}

let create = organFn => {
  let organ = {
    describeFn: organFn,
    latestResult: null,

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
      this.dasyncIndex = 0
      this.latestResult = this.describeFn(this.props)
      setTimeout(() => this.triggerExcrete())
    },

    dasyncMap: [],
    getDasyncPoint(index) {
      var point = this.dasyncMap[index]
      if (point) return point

      this.dasyncMap[index] = {
        organ: this,

        hasExcreted: false,
        installed: false,
        toUninstall: null,

        latestExcrement: null,
        setExcrement(excrement) {
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
          this.hasExcreted = true
          this.setExcrement(excrement)
          return this.latestExcrement
        },
        // todo: make multiple asyncGive as one, just like what setState in React
        asyncGive: function(excrement) {
          this.setExcrement(excrement)
          setTimeout(() => this.organ.operate())
        },

        deps: null,
        receiveDeps: function(deps) {
          this.installable = !shallowEqual(deps, this.deps)
          this.deps = deps
          return this
        },
        install: function(func) {
          if (this.installed && !this.installable) return this
          this.uninstall()
          this.toUninstall = func(this.deps, this.asyncGive.bind(this))
          this.installed = true
          return this;
        },
        uninstall: function() {
          if (typeof this.toUninstall === 'function') this.toUninstall()
        }
      }

      return this.dasyncMap[index]
    },
    take: function(deps) {
      let dasyncPoint = this.getDasyncPoint(this.dasyncIndex)
      dasyncPoint.receiveDeps(deps)
      this.dasyncIndex ++

      return dasyncPoint
    },

    onExcreteListeners: [],
    onExcrete: function(func) {
      this.onExcreteListeners.push(func)
      return this
    },
    triggerExcrete: function() {
      this.onExcreteListeners.forEach(func => func(this.latestResult))
      return this
    }
  }

  return organ;
}

let organ;
exports.live = function(organFn, props) {
  organ = organ || create(organFn);
  organ.receiveProps(props);
  return organ;
}
