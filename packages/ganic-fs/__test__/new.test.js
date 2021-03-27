const Ganic = require('ganic');

const fs = require('fs');
const path = require('path');
const { render } = require('../index');

const rootDir = 'fs-test-new';
beforeEach(() => {
  fs.rmdirSync(path.resolve(__dirname, rootDir), { recursive: true });
});

it('should new & vanish a file properly', () => {
  const App = () => <dir name={rootDir}>
    <file name="index.html"/>
    <file name="style.css"/>
    <file name="index.js"/>
    <file name="readme.md"/>
  </dir>;
  render(<App />, __dirname);

  [
    'index.html',
    'style.css',
    'index.js',
    'readme.md',
  ].forEach(filename => {
    const fileExists = fs.existsSync(path.resolve(__dirname, rootDir, filename));
    expect(fileExists).toEqual(true);
  });
});
