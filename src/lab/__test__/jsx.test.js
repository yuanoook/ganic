'use strict';

const Ganic = require('../../index');
const {render, attach} = Ganic;

describe('JSX parser', () => {
  it('should parseJSX properly', () => {
    const content = '3';
    const Organism3 = () => attach(content);
    const Organism2 = () => (
      <box className="a-beautiful-box" other="other-attr-value">
        <Organism3/>
      </box>
    );
    const Organism1 = () => <Organism2/>;
    const envRoot = document.createElement('div');
    const tree = render({organDesc: <Organism1/>, envRoot});

    expect(envRoot.innerHTML).toBe(`<div class="a-beautiful-box" other="other-attr-value">${content}</div>`);
    expect(envRoot.textContent).toBe(content);
    tree.vanish();
    expect(envRoot.textContent).toBe('');
  });
});
