'use strict';

const {render, attach} = require('../../Ganic');
const {organDomMap} = require('../../env/basic/connect/map');

describe('organTree', () => {
  it('should new & vanish a OrganTree properly', () => {
    const content = '2';
    const organism2 = () => attach(content);
    const organism1 = () => ({organism: organism2});
    const organDesc = {organism: organism1};
    const envRoot = document.createElement('div');
    const tree = render({organDesc, envRoot});

    expect(envRoot.textContent).toBe(content);
    tree.vanish();
    expect(envRoot.textContent).toBe('');
  });

  it('should new & vanish a OrganTree properly with string TAG organism', () => {
    const smile = ':D';
    const organDesc = {
      organism: 'box',
      props: {
        class: 'a-beautiful-box',
        other: 'other-attr-value',
        children: smile,
      },
    };
    const envRoot = document.createElement('div');
    const tree = render({organDesc, envRoot});
    const boxDom = organDomMap.get(tree.trunkNode.organ);

    expect(boxDom.outerHTML).toBe(`<div class="a-beautiful-box" other="other-attr-value">${smile}</div>`);
    expect(boxDom.parentElement).toBe(envRoot);
    expect(envRoot.textContent).toBe(smile);
    tree.vanish();
    expect(envRoot.textContent).toBe('');
  });

  it('should new & vanish a OrganTree properly with nested string TAG organism', () => {
    const content = '3';
    const organism3 = () => attach(content);
    const organism2 = () => ({organism: 'box', props: {
      class: 'a-beautiful-box',
      other: 'other-attr-value',
      children: [
        {
          organism: organism3,
        },
      ],
    }});
    const organism1 = () => ({organism: organism2});
    const organDesc = {organism: organism1};
    const envRoot = document.createElement('div');
    const tree = render({organDesc, envRoot});

    expect(envRoot.innerHTML).toBe(`<div class="a-beautiful-box" other="other-attr-value">${content}</div>`);
    expect(envRoot.textContent).toBe(content);
    tree.vanish();
    expect(envRoot.textContent).toBe('');
  });

  it('should new & vanish a single OrganLeaf properly under a tree', () => {
    const content = '3';
    const envRoot = document.createElement('div');
    const tree = render({organDesc: content, envRoot});

    expect(envRoot.innerHTML).toBe(`3`);
    expect(envRoot.textContent).toBe(content);
    tree.vanish();
    expect(envRoot.textContent).toBe('');
  });
});
