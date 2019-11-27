const { getUpdatingOrgan, attach } = require('ganic');
const { applyAttrs } = require('./attrs');
const { organDomMap } = require('../connect/map');
const { taskify } = require('../taskStack');

const engage = taskify((organ, tagName, attrs) => {
  let dom = organDomMap.get(organ);
  if (!dom) {
    dom = document.createElement(tagName);
    organDomMap.set(organ, dom);
  }
  applyAttrs(dom, attrs);
});

const release = taskify(organ => {
  const dom = organDomMap.get(organ);
  organDomMap.delete(organ);
  if (dom) {
    dom.remove();
  }
});

const newParasitismByTag = tagName => attrs => {
  const organ = getUpdatingOrgan();
  engage(organ, tagName, attrs);
  return ({ ending }) => {
    if (ending) {
      release(organ);
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
