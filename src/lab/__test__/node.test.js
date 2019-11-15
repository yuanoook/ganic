'use strict';

const Ganic = require('../../index');
const {render, create, attach, useState, useMemo} = Ganic;
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
    const appNode = tree.trunkNode.firstChild;

    const testRelationship = parentNode => {
      Object.keys(parentNode.children).map(key => parentNode.children[key]).forEach((node, index, list) => {
        if (index === 0) {
          expect(parentNode.firstChild).toBe(node);
          expect(node.preSibling).toBe(null);
        } else {
          expect(node.preSibling).toBe(list[index - 1]);
        }

        if (index === list.length - 1) {
          expect(parentNode.lastChild).toBe(node);
          expect(node.nextSibling).toBe(null);
        } else {
          expect(node.nextSibling).toBe(list[index + 1]);
        }
        expect(node.firstChild).toBe(null);
        expect(node.lastChild).toBe(null);
      });
    };

    testRelationship(appNode);
    appNode.children['1'].vanish();
    testRelationship(appNode);
    appNode.children['2'].vanish();
    testRelationship(appNode);

    tree.vanish();
  });

  it('should build the right relationship for leaf', () => {
    const envRoot = document.createElement('div');
    const App = () => {
      return [1, 2, 3, 4];
    };
    const tree = render({organDesc: <App />, envRoot});
    const appNode = tree.trunkNode.firstChild;

    const testRelationship = () => {
      Object.keys(appNode.children).map(key => appNode.children[key]).forEach((leaf, index, list) => {
        if (index === 0) {
          expect(appNode.firstChild).toBe(leaf);
          expect(leaf.preSibling).toBe(null);
        } else {
          expect(leaf.preSibling).toBe(list[index - 1]);
        }
  
        if (index === list.length - 1) {
          expect(appNode.lastChild).toBe(leaf);
          expect(leaf.nextSibling).toBe(null);
        } else {
          expect(leaf.nextSibling).toBe(list[index + 1]);
        }
      });
    };

    testRelationship();
    expect(envRoot.textContent).toBe('1234');

    appNode.children['1'].vanish();
    testRelationship();
    expect(envRoot.textContent).toBe('134');

    tree.vanish();
  });

  it('should keep the same input with dynamic list above', () => {
    const mockFn = jest.fn();
    const envRoot = document.createElement('div');
    const App = () => {
      const [count, setCount] = useState(1);
      const onButtonClick = () => setCount(n => n + 1);
      const inputRef = useMemo(() => {
        const fn = value => {
          mockFn();
          fn.current = value;
        };
        fn.current = null;
        return fn;
      });
      const numbers = new Array(count).join(',').split(',').map((x, i) => i);

      return <>
        { numbers }
        <input ref={inputRef} value={count}/>
        <button onClick={onButtonClick}/>
      </>;
    };

    const tree = render({organDesc: <App />, envRoot});
    envRoot.querySelector('button').dispatchEvent(new MouseEvent('click'));
    expect(mockFn.mock.calls.length).toBe(1);

    tree.vanish();
  });

});
