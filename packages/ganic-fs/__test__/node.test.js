const Ganic = require('ganic');
const {useState} = require('ganic-usex');
const path = require('path');
const fs = require('fs');
const {render} = require('../index');
const {expectFile} = require('./utils');

jest.setTimeout(30 * 1000);

beforeEach(() => {
  fs.rmdirSync(path.resolve(__dirname, 'fs-test'), { recursive: true });
});

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

  it('should handle file event properly', async () => {
    const App = () => {
      const [size, setSize] = useState(0);
      return <dir name="fs-test">
      <file name="index.html" onSizeChange={setSize}/>
      {
        size && <file name={`index.html-size-is-${size}`} />
      }
    </dir>;
    };
  
    render(<App />, __dirname);

    const htmlPath = path.resolve(__dirname, 'fs-test', 'index.html');
    expect(fs.existsSync(htmlPath)).toEqual(true);

    const randomText = '' + Math.floor(
      (Math.random() * 10) ** (Math.random() * 10) * (Math.random() * 10));
    const text = `<html><body>${randomText}</body></html>`;

    fs.writeFileSync(htmlPath, text);

    const sizePath = path.resolve(
      __dirname, 'fs-test', `index.html-size-is-${text.length}`);
    await expectFile(sizePath);
  });
});
