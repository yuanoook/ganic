const Ganic = require('ganic');
const {attach} = Ganic;
const {render} = require('ganic-dom');

describe('JSX parser', () => {
  it('should parseJSX properly', () => {
    const content = '3';
    const Organism3 = () => attach(content);
    const Organism2 = () => (
      <div class="a-beautiful-div" other="other-attr-value">
        <Organism3/>
      </div>
    );
    const Organism1 = () => <Organism2/>;
    const envRoot = document.createElement('div');
    const tree = render(<Organism1/>, envRoot);

    expect(envRoot.innerHTML).toBe(`<div class="a-beautiful-div" other="other-attr-value">${content}</div>`);
    expect(envRoot.textContent).toBe(content);
    tree.vanish();
    expect(envRoot.textContent).toBe('');
  });

  it('should handle Fragment properly', () => {
    const content = '3';
    const envRoot = document.createElement('div');
    const App = () => <>{content}</>;
    const tree = render(<App/>, envRoot);

    expect(envRoot.innerHTML).toBe(content);
    expect(envRoot.textContent).toBe(content);
    tree.vanish();
    expect(envRoot.textContent).toBe('');
  });

  it('should handle empty children properly', () => {
    const content = '3';
    const envRoot = document.createElement('div');
    const App = () => <>{content}<h1></h1></>;
    const tree = render(<App/>, envRoot);

    expect(envRoot.innerHTML).toBe(`${content}<h1></h1>`);
    expect(envRoot.textContent).toBe(content);
    tree.vanish();
    expect(envRoot.textContent).toBe('');
  });
});
