'use strict';

const {create, attach} = require('../../Ganic');
const {OrganNode} = require('../OrganNode');
const {OrganLeaf} = require('../OrganLeaf');

describe('organNode', () => {
  it('should new & vanish a OrganNode properly', () => {
    const organism1 = () => ({organism: organism2, props: attach(1)});
    const organism2 = () => attach(2);

    const organ1 = create({organism: organism1, props: 1});
    const node1 = new OrganNode({organ: organ1});

    expect(node1.organ).toBe(organ1);
    expect(node1.organ.organism).toBe(organism1);

    const node2 = node1.children[0];
    expect(node2 instanceof OrganNode).toBe(true);
    expect(node2.organ.organism).toBe(organism2);
  
    const leaf = node2.children[0];
    expect(leaf instanceof OrganLeaf).toBe(true);
    expect(leaf.value).toBe(2);

    node1.vanish();

    expect(node1.organ).toBe(null);
    expect(node1.children).toEqual({});
    expect(node1.parent).toBe(null);

    expect(node2.organ).toBe(null);
    expect(node2.children).toEqual({});
    expect(node2.parent).toBe(null);
    
    expect(leaf.value).toBe(null);
    expect(leaf.parent).toBe(null);
  });
});
