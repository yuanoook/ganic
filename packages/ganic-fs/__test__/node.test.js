const Ganic = require('ganic');
const path = require('path');
const fs = require('fs');
const {render} = require('../index');

describe('ganic-fs', () => {
  it('should new & vanish a file properly', () => {
    const App = () => <dir name="fs-test">
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
      const fileExists = fs.existsSync(path.resolve(__dirname, 'fs-test', filename));
      expect(fileExists).toEqual(true);
    });

  });

  it('should handle file event properly', () => {
    const App = () => <dir name="fs-test">
      <file name="index.html"/>
    </dir>;
    render(<App />, __dirname);

    [
      'index.html',
      'style.css',
      'index.js',
      'readme.md',
    ].forEach(filename => {
      const fileExists = fs.existsSync(path.resolve(__dirname, 'fs-test', filename));
      expect(fileExists).toEqual(true);
    });

  });
});
