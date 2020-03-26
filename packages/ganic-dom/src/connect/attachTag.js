const { getUpdatingOrgan, attach } = require('ganic');
const { organDomMap, getNamespace } = require('./shared');
const { removeDom } = require('./utils');
const { taskify } = require('../taskQueue');
const applyAttrs = require('./applyAttrs');

const engage = taskify((organ, tagName, attrs) => {
  let dom = organDomMap.get(organ);
  if (!dom) {
    const xmlns = getNamespace(tagName, organ.node);
    dom = xmlns ? document.createElementNS(xmlns, tagName) : document.createElement(tagName);
    organDomMap.set(organ, dom);
  }
  applyAttrs(dom, attrs);
});

const release = taskify(organ => {
  const dom = organDomMap.get(organ);
  organDomMap.delete(organ);
  if (dom) {
    removeDom(dom);
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

const attachTag = (tagName, attrs) => attach(
  parasitismFactory(tagName), attrs,
);

module.exports = attachTag;
