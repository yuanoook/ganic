const { Organ } = require('./lab/Organ');
const { create } = require('./moirai/Klotho');
const Lakhesis = require('./moirai/Lakhesis');
const { attach, getUpdatingOrgan } = Lakhesis;
const { Fragment, createElement } = require('./lab/JSXparser');

module.exports = {
  Organ,
  create,
  attach,
  getUpdatingOrgan,
  getGivingParasite: () => Lakhesis.givingParasite,
  Fragment,
  createElement,
};
