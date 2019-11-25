const Ganic = require('ganic');
const {attach} = Ganic;
const {render} = require('../index');
const {organDomMap} = require('../src/connect/map');

describe('organTree', () => {
  it('should new & vanish a OrganTree properly', () => {
    const content = '2';
    const organism2 = () => attach(content);
    const organism1 = () => ({organism: organism2});
    const organDesc = {organism: organism1};
    const envRoot = document.createElement('div');
    const tree = render(organDesc, envRoot);

    expect(envRoot.textContent).toBe(content);
    tree.vanish();
    expect(envRoot.textContent).toBe('');
  });

  it('should new & vanish a OrganTree properly with string TAG organism', () => {
    const smile = ':D';
    const organDesc = {
      organism: 'div',
      props: {
        class: 'a-beautiful-div',
        other: 'other-attr-value',
        children: smile,
      },
    };
    const envRoot = document.createElement('div');
    const tree = render(organDesc, envRoot);
    const divDom = organDomMap.get(tree.trunkNode.firstChild.organ);

    expect(divDom.outerHTML).toBe(`<div class="a-beautiful-div" other="other-attr-value">${smile}</div>`);
    expect(divDom.parentElement).toBe(envRoot);
    expect(envRoot.textContent).toBe(smile);
    tree.vanish();
    expect(envRoot.textContent).toBe('');
  });

  it('should new & vanish a OrganTree properly with nested string TAG organism', () => {
    const content = '3';
    const organism3 = () => attach(content);
    const organism2 = () => ({organism: 'div', props: {
      class: 'a-beautiful-div',
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
    const tree = render(organDesc, envRoot);

    expect(envRoot.innerHTML).toBe(`<div class="a-beautiful-div" other="other-attr-value">${content}</div>`);
    expect(envRoot.textContent).toBe(content);
    tree.vanish();
    expect(envRoot.textContent).toBe('');
  });

  it('should new & vanish a single OrganLeaf properly under a tree', () => {
    const content = '3';
    const envRoot = document.createElement('div');
    const tree = render(content, envRoot);

    expect(envRoot.innerHTML).toBe(`3`);
    expect(envRoot.textContent).toBe(content);
    tree.vanish();
    expect(envRoot.textContent).toBe('');
  });

  it('should accept Fragment to build a tree', () => {
    const A = () => 1;
    const B = () => 2;
    const C = () => 3;
    const envRoot = document.createElement('div');
    const tree = render(<>
      <A/><B/><C/>
    </>, envRoot);
    expect(envRoot.innerHTML).toBe(`123`);
    tree.vanish();
    expect(envRoot.textContent).toBe('');
  });

  it('should render the same tree on the same envRoot', () => {
    const A = () => {};
    const envRoot = document.createElement('div');
    const tree = render(<A/>, envRoot);
    const tree2 = render(<A/>, envRoot);
    expect(tree).toBe(tree2);
    tree.vanish();
  });
});
