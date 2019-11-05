'use strict';

const { create, attach } = require('../Ganic');

const useOrgan = (organism, props) => {
  attach((deps, give, {handover: organ}) => {
    if (!organ) {
      organ = create({organism, deps}).addListener(give);
    } else {
      organ.receive(deps);
    }

    return ({down}) => {
      if (down) {
        organ.shutdown();
        return;
      }
      return organ;
    };
  }, props);
};

module.exports = {
  useOrgan,
};
