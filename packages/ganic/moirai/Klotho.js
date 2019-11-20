
const { Organ } = require('../lab/Organ');

const create = ({organism, props}) =>
  new Organ({organism, props});

module.exports = {
  create,
};
