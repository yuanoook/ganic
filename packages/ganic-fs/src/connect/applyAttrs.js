const descriptors = require('./descriptor');
const applyEventListener = require('./applyEvents');
const attrDealers = require('./attrDealers');

const __attrs = Symbol();

const applyRef = ({
  tagName,
  organ,
  fullName,
  ref,
  creature,
}) => ref ? ref(descriptors[tagName]({organ, fullName, creature})) : null;

const applyAttr = ({
  tagName,
  fullName,
  organ,
  name,
  value,
  creature,
}) => {
  if (name === 'key') {
    return;
  }

  if (name === 'ref') {
    applyRef({
      tagName,
      organ,
      fullName,
      ref: value,
      creature,
    });
    return;
  }

  if (/^on[A-Z][a-zA-Z]*$/.test(name)) {
    applyEventListener({
      tagName,
      fullName,
      organ,
      name,
      listener: value,
      creature,
    });
    return;
  }

  if (attrDealers[tagName] &&
      attrDealers[tagName][name]) {
    attrDealers[tagName][name]({
      tagName,
      fullName,
      organ,
      value,
      creature,
    });
    return;
  }
};

const applyAttrs = (organ, {tagName, fullName, attrs, creature}) => {
  const oldAttrs = organ[__attrs] || {};
  Object.keys({...oldAttrs, ...attrs}).forEach(
    name => oldAttrs[name] !== attrs[name] && applyAttr({
      tagName,
      fullName,
      organ,
      name,
      value: attrs[name],
      creature,
    }),
  );
  organ[__attrs] = {...attrs};
};

module.exports = applyAttrs;
