'use strict';

const {Organ} = require('../Organ');

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

  return new Organ({organism});
};

module.exports = {
  spin,
};
