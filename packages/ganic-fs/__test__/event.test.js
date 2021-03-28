const Ganic = require('ganic');
const { useState, useRef } = require('ganic-usex');

const fs = require('fs');
const path = require('path');
const { render } = require('../index');
const { expectFile } = require('./utils');

jest.setTimeout(30 * 1000);

const rootPath = 'fs-test-event';
beforeEach(() => {
  fs.rmdirSync(path.resolve(__dirname, rootPath), { recursive: true });
});

it('should handle file event properly', async () => {
  let htmlFd;
  const App = () => {
    const [size, setSize] = useState(0);
    htmlFd = useRef(true);

    return <dir name={rootPath}>
      <file name="index.html" ref={htmlFd} onSizeChange={setSize}/>
      {
        size && <file name={`index.html-size-is-${size}`} />
      }
    </dir>;
  };

  render(<App />, __dirname);

  const htmlPath = path.resolve(__dirname, rootPath, 'index.html');
  expect(fs.existsSync(htmlPath)).toEqual(true);

  const randomText = new Array(Math.floor(Math.random() * 20))
    .join()
    .split('')
    .map((_, i) => `<h${i}/>\n`)
    .join('');

  htmlFd.text = `<html><body>\n${randomText}</body></html>`;

  const sizePath = path.resolve(
    __dirname, rootPath, `index.html-size-is-${htmlFd.text.length}`);
  await expectFile(sizePath);
});
