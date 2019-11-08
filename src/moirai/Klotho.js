'use strict';

const Lakhesis = require('./Lakhesis');
const { Organ } = require('../lab/Organ');

const create = ({ organism, props }) => {
  return new Organ({organism, props});
};

const attach = function(parasitism, deps, firstExcrement) {
  const updatingOrgan = Lakhesis.getUpdatingOrgan();
  if (!updatingOrgan) {
    throw new Error("Don't use ATTACH outside of organism!");
  }
  return updatingOrgan.attach(parasitism, deps, firstExcrement);
};

module.exports = {
  create,
  attach,
};
