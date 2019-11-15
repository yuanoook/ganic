'use strict';

const Ganic = require('../../index');
const {render, create, attach} = Ganic;
const {OrganNode} = require('../OrganNode');
const {OrganLeaf} = require('../OrganLeaf');

describe('organNode', () => {
  it('should new & vanish a OrganNode properly', () => {
    const organism2 = () => attach(2);
    const organism1 = () => ({organism: organism2, props: attach(1)});

    const organ1 = create({organism: organism1, props: 1});
    const node1 = new OrganNode({organ: organ1});

    expect(node1.organ).toBe(organ1);
    expect(node1.organ.organism).toBe(organism1);
    expect(node1.parent).toBe(undefined);

    const node2 = node1.children[0];
    expect(node2 instanceof OrganNode).toBe(true);
    expect(node2.organ.organism).toBe(organism2);
    expect(node2.parent).toBe(node1);
  
    const leaf = node2.children[0];
    expect(leaf instanceof OrganLeaf).toBe(true);
    expect(leaf.value).toBe(2);
    expect(leaf.parent).toBe(node2);

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

  it('should build the right relationship', () => {
    const envRoot = document.createElement('div');
    const A = () => {};
    const B = () => {};
    const C = () => {};
    const D = () => {};
    const App = () => <><A/><B/><C/><D/></>;
    const tree = render({organDesc: <App />, envRoot});

    const testTrunkRelationship = trunkNode => {
      Object.keys(trunkNode.children).map(key => trunkNode.children[key]).forEach((node, index, list) => {
        if (index === 0) {
          expect(trunkNode.firstChild).toBe(node);
          expect(node.preSibling).toBe(null);
        } else {
          expect(node.preSibling).toBe(list[index - 1]);
        }
  
        if (index === list.length - 1) {
          expect(trunkNode.lastChild).toBe(node);
          expect(node.nextSibling).toBe(null);
        } else {
          expect(node.nextSibling).toBe(list[index + 1]);
        }
        expect(node.firstChild).toBe(null);
        expect(node.lastChild).toBe(null);
      });
    };

    testTrunkRelationship(tree.trunkNode);
    tree.trunkNode.children['1'].vanish();
    testTrunkRelationship(tree.trunkNode);
    tree.trunkNode.children['2'].vanish();
    testTrunkRelationship(tree.trunkNode);

    tree.vanish();
  });

  it('should build the right relationship for leaf', () => {
    const envRoot = document.createElement('div');
    const A = () => {
      return [1, 2, 3, 4];
    };
    const App = () => <A/>;
    const tree = render({organDesc: <App />, envRoot});
    const aNode = tree.trunkNode.children['0'];

    const testRelationship = () => {
      Object.keys(aNode.children).map(key => aNode.children[key]).forEach((leaf, index, list) => {
        if (index === 0) {
          expect(aNode.firstChild).toBe(leaf);
          expect(leaf.preSibling).toBe(null);
        } else {
          expect(leaf.preSibling).toBe(list[index - 1]);
        }
  
        if (index === list.length - 1) {
          expect(aNode.lastChild).toBe(leaf);
          expect(leaf.nextSibling).toBe(null);
        } else {
          expect(leaf.nextSibling).toBe(list[index + 1]);
        }
      });
    };

    testRelationship();
    expect(envRoot.textContent).toBe('1234');

    aNode.children['1'].vanish();
    testRelationship();
    expect(envRoot.textContent).toBe('134');

    tree.vanish();
  });
});
