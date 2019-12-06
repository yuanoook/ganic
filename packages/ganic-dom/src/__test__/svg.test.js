const Ganic = require('ganic');
const {render} = require('../../index');

describe('basic attrs', () => {
  it('should get ref.current by useRef properly', () => {
    const envRoot = document.createElement('div');
    const App = () => {
      return <div>
        : D
        <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <path d="M250,250"></path>
        </svg>
      </div>;
    };
    const tree = render(<App />, envRoot);

    expect(envRoot.innerHTML).toBe('<div>: D<svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><path d="M250,250"></path></svg></div>');

    tree.vanish();
    expect(envRoot.textContent).toBe('');
  });
});
