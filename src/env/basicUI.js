'use strict';

const { attach } = require('../moirai/Klotho');

const divParasitism = (attrs, give, { handover: div }) => {
  if (!div) {
    div = document.createElement('div');
  }
  //TODO: apply attrs, can be async :D
  give(div);
  return ({ ending }) => {
    if (ending) {
      div.remove();
      return;
    }
    return div;
  };
};

const boxOrganism = props => attach(divParasitism, props);

const organismMap = {
  box: boxOrganism,
};

const getTagOrganism = tagName => {
  return organismMap[tagName];
};

const basicUI = {
  getTagOrganism,
};

module.exports = {
  basicUI,
};
