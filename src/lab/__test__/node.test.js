'use strict';

const {create, attach} = require('../../Ganic');
const {OrganNode} = require('../OrganNode');

describe('organNode', () => {
  it('should new a OrganNode properly', () => {
    const organism1 = () => ({organism: organism2, props: attach(1)});
    const organism2 = () => attach(2);

    const organ = create({organism: organism1, props: 1});
    const node = new OrganNode({organ});

    expect(node.organ).toBe(organ);
    expect(node.children[0].organ.organism).toBe(organism2);
  });
});
