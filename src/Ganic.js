const SINGLETON = require('./etc/singleton')
const orphanage = require('./etc/orphanage')

exports.take = function(deps) {
  if (!SINGLETON.operatingOrgan) throw "Don't use TAKE outside of organism!"
  return SINGLETON.operatingOrgan.take(deps)
}

exports.attach = function(parasitism, deps, firstExcrement) {
  if (!SINGLETON.operatingOrgan) throw "Don't use TAKE outside of organism!"
  return SINGLETON.operatingOrgan.attach(parasitism, deps, firstExcrement)
}

const orphanLive = (organism, props) => {
  const organ = orphanage.get(organism)
  organ.receiveProps(props)
  return organ
}

exports.live = function(organism, props, parent, key) {
  if (!parent) return orphanLive(organism, props)
  // todo, add parent and key logic
}
