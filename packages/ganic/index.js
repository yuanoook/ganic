const { Organ } = require('./lab/Organ');
const { create } = require('./moirai/Klotho');
const Lakhesis = require('./moirai/Lakhesis');
const { attach, getUpdatingOrgan, getGivingParasite } = Lakhesis;
const { Fragment, createElement } = require('./lab/JSXparser');

module.exports = {
  Fragment,
  createElement,

  Organ,
  create,
  attach,

  getUpdatingOrgan,
  getGivingParasite,
};
