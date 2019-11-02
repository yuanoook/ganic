'use strict';

const {Organ} = require('../Organ');

const organs = new Map();

const spin = organSetDescription => {
  const {organism} = organSetDescription;

  /*
    TODO: be able to understand different organSetDescription

    organSetDescription can be like

      1. <organDescription> {
          organism,
          props: {
            children: <organSetDescription>
          },
          parent,
          key
        }

      2. [organSetDescription, organSetDescription]
      3. null, undefined, string, number, function ...

  */

  return new Organ({organism})
}

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
  spin,
  get,
};
