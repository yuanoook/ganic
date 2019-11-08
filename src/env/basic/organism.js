'use strict';

const { attach } = require('../../moirai/Klotho');
const { getUpdatingOrgan } = require('../../moirai/Lakhesis');
const { applyAttrs } = require('./attribute');
const { organDomMap } = require('./map');

const divParasitism = attrs => {
  let organ = getUpdatingOrgan();
  let div = organDomMap.get(organ);
  if (!div) {
    div = document.createElement('div');
    organDomMap.set(organ, div);
  }

  applyAttrs(div, attrs); //can be async

  return ({ ending }) => {
    if (ending) {
      div.remove();
      organDomMap.delete(organ);
      organ = null;
      div = null;
      return;
    }
  };
};

const boxOrganism = props => {
  const {children, ...attrs} = props;
  attach(divParasitism, attrs);
  return children;
};

const organisms = {
  box: boxOrganism,
};

const getOrganismByTag = tagName => {
  if (organisms[tagName]) {
    return organisms[tagName];
  }
  throw new Error(`Cannot find tag: ${tagName}`);
};

module.exports = {
  getOrganismByTag,
};
