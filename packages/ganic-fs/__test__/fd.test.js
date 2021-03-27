const Ganic = require('ganic');
const fs = require('fs');
const path = require('path');
const { render } = require('../index');
const { useRef } = require('ganic-usex');

jest.setTimeout(30 * 1000);

beforeEach(() => {
  fs.rmdirSync(path.resolve(__dirname, 'fs-test-fd'), { recursive: true });
});

describe('ganic-fs file descriptor', () => {
  it('file descriptor json setter, stat getter', () => {
    let fd;
    const App = () => {
      fd = useRef(true);
      return <dir name="fs-test-fd">
        <file name={`fd.${Date.now()}.txt`} ref={fd}/>
      </dir>;
    };
    render(<App />, __dirname);

    const world = 'world!';
    fd.json = {hello: world};

    const text = `{\n  "hello": "${world}"\n}`;
    expect(fd.text).toBe(text);
    expect(fd.size).toBe(text.length);
    expect(fd.json.hello).toBe(world);

    const now = Date.now();
    const obj = {hello: world, createAt: now};
    fd.text = JSON.stringify(obj, null, 4);

    expect(fd.json).toEqual(obj);
    expect(fd.json.createAt).toBe(now);
    expect(fd.size).toBe(fd.stat.size);
  });
});
