'use strict';

const { Organ } = require('../lab/Organ');
const { OrganTree } = require('../lab/OrganTree');
const basicUI = require('../env/basic');

const render = ({organDesc, envRoot, envUtils = basicUI}) =>
  new OrganTree({organDesc, envRoot, envUtils});

const create = ({organism, props}) =>
  new Organ({organism, props});

module.exports = {
  render,
  create,
};
