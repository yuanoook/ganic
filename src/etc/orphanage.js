'use strict';

const {Organ} = require('../Organ');

const organs = new Map();

const get = organism => {
  let organ = organs.get(organism);
  if (organ) {
    return organ;
  }

  organ = new Organ({organism});
  organs.set(organism, organ);

  return organ;
};

module.exports = {
  get,
};
