const { Organ } = require('../lab/Organ');
const { getUpdatingOrgan } = require('./Lakhesis');

const create = ({organism, props}) =>
  new Organ({organism, props});

const attach = function(parasitism, deps, firstValue) {
  const updatingOrgan = getUpdatingOrgan();
  if (!updatingOrgan) {
    throw new Error("Don't use ATTACH outside of organism!");
  }
  return updatingOrgan.attach(parasitism, deps, firstValue);
};

module.exports = {
  create,
  attach,
};
