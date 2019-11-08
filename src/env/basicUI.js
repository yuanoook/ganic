'use strict';

const { attach } = require('../moirai/Klotho');

const divParasitism = (deps, give, { handover: div }) => {
  if (!div) {
    div = document.createElement('div');
  }
  give(div);
  return ({ ending }) => {
    if (ending) {
      div.remove();
      return;
    }
    return div;
  };
};

const boxOrganism = () => attach(divParasitism);

const organismMap = {
  box: boxOrganism,
};

const basicUI = {
  organismMap,
};

module.exports = {
  basicUI,
};
