'use strict';

const {create, attach} = require('../../Ganic');

const {useOrgan} = require('..');

describe('useOrgan', () => {
  it('should not report Error calling attach after useOrgan', () => {
    const organism = () => {
      useOrgan(() => {});
      attach(() => {});
    };
    create({organism});
  });
});
