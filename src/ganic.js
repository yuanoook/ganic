const { Organ } = require('./Organ')
const { SINGLETON } = require('./utils')

exports.take = function(deps) {
  if (!SINGLETON.operatingOrgan) throw "Don't use TAKE outside of organism!"
  return SINGLETON.operatingOrgan.take(deps)
}

const create = organism => {
  return new Organ({ organism })
}

exports.live = function(organism, props) {
  const isSameOrganism = SINGLETON.anOrgan && SINGLETON.anOrgan.organism === organism
  SINGLETON.anOrgan = isSameOrganism ? SINGLETON.anOrgan : create(organism);
  SINGLETON.anOrgan.receiveProps(props);
  return SINGLETON.anOrgan;
}
