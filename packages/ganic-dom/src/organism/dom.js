const { getUpdatingOrgan, attach } = require('ganic');
const { applyAttrs } = require('./attrs');
const { organDomMap } = require('../connect/map');
const { taskify } = require('../taskStack');

const newParasitismByTag = tagName => attrs => {
  let organ = getUpdatingOrgan();
  let dom;
  taskify(tagOrgan => {
    dom = organDomMap.get(tagOrgan);
    if (!dom) {
      dom = document.createElement(tagName);
      organDomMap.set(tagOrgan, dom);
    }
    applyAttrs(dom, attrs);
  })(organ);
  return ({ ending }) => {
    if (ending) {
      dom.remove();
      organDomMap.delete(organ);
      organ = null;
      dom = null;
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
  const {children, style, ...attrs} = props || {};
  const parasitism = parasitismFactory(tagName);
  attach(parasitism, {...attrs, style: attach(style, style)});
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
