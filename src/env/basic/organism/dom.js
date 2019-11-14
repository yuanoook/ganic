'use strict';

const { getUpdatingOrgan, attach } = require('../../../moirai/Lakhesis');
const { applyAttrs } = require('./attrs');
const { organDomMap } = require('../connect/map');

const newParasitismByTag = tagName => attrs => {
  let organ = getUpdatingOrgan();
  let div = organDomMap.get(organ);
  if (!div) {
    div = document.createElement(tagName);
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

const tagParasitismMap = {};
const parasitismFactory = tagName => {
  if (!tagParasitismMap[tagName]) {
    tagParasitismMap[tagName] = newParasitismByTag(tagName);
  }
  return tagParasitismMap[tagName];
};

const newOrganismByTag = tagName => props => {
  const {children, ...attrs} = props || {};
  const parasitism = parasitismFactory(tagName);
  attach(parasitism, attrs);
  return children;
};

const tagOrganismMap = {};
const organismFactory = tagName => {
  if (!tagOrganismMap[tagName]) {
    tagOrganismMap[tagName] = newOrganismByTag(tagName);
  }
  return tagOrganismMap[tagName];
};

module.exports = {
  organismFactory,
};