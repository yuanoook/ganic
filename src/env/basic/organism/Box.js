'use strict';

const { getUpdatingOrgan, attach } = require('../../../moirai/Lakhesis');
const { applyAttrs } = require('./utils');
const { organDomMap } = require('../connect/map');

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

const Box = props => {
  const {children, ...attrs} = props;
  attach(divParasitism, attrs);
  return children;
};

module.exports = {
  Box,
};
