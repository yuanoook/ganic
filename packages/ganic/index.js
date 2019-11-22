const { Organ } = require('./lab/Organ');
const { create, attach } = require('./moirai/Klotho');
const {
  getUpdatingOrgan,
  getAllUpdatingOrgans,
  getGivingParasite,
  getAllGivingParasites,
} = require('./moirai/Lakhesis');
const { Fragment, createElement } = require('./lab/JSXparser');

module.exports = {
  Fragment,
  createElement,

  Organ,

  create,
  attach,

  getUpdatingOrgan,
  getAllUpdatingOrgans,
  getGivingParasite,
  getAllGivingParasites,
};
