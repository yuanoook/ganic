/* eslint-disable no-for-of-loops/no-for-of-loops */

const { attach } = require('ganic');
const attachTag = require('./attachTag');

const makeOrganism = (tagName, _attachTag) => props => {
  const {children, style, ...attrs} = props || {};
  _attachTag(tagName, {...attrs, style: attach(style, style)});
  return children;
};

const newOrganismByTag = (tagName, configs) => {
  for (let config of configs) {
    if (!config || !config.makeOrganism) {
      continue;
    }
    const organism = config.makeOrganism(tagName, attachTag);
    if (organism) {
      return organism;
    }
  }
  return makeOrganism(tagName, attachTag);
};

const tagOrganismMap = {};
const getOrganism = (tagName, configs) => {
  if (!tagOrganismMap[tagName]) {
    tagOrganismMap[tagName] = newOrganismByTag(tagName, configs);
  }
  return tagOrganismMap[tagName];
};

module.exports = getOrganism;
