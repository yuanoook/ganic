const Ganic = require('ganic');
const { useState, useRef } = require('ganic-usex');

const fs = require('fs');
const path = require('path');
const { render } = require('../index');
const { expectFile } = require('./utils');

const rootDir = 'fs-test-sock';
jest.setTimeout(30 * 1000);
beforeEach(() => {
  fs.rmdirSync(path.resolve(__dirname, rootDir), { recursive: true });
});

it('should handle sock file', async () => {
  let clientDb;

  const App = () => {
    const [size, setSize] = useState(0);
    const serverDb = useRef(true);
    const clientSock = useRef(true);
    clientDb = useRef(true);

    const serverIO = i => {
      serverDb.json = {server: true, ...i};
      return JSON.stringify(i, null, 2).length;
    };

    const clientIO = i => {
      setSize(i);
    };

    const onClientDbChange = db => {
      clientSock.write(db.text); 
    };

    return <dir name={rootDir}>
      {size && <file name={`client-set-size-${size}`}/>}
      <dir name="server">
        <file name="server.db" ref={serverDb} />
        <server name="echo.sock" io={serverIO}/>
      </dir>
      <dir name="client">
        <file name="client.db" ref={clientDb} onChange={onClientDbChange}/>
        <client name="../server/echo.sock" io={clientIO} ref={clientSock}/>
      </dir>
    </dir>;
  };
  render(<App />, __dirname);

  clientDb.json = {hello: 'world!'};

  const sizePath = path.resolve(
    __dirname, rootDir, `index.html-size-is-${clientDb.text.length}`);
  await expectFile(sizePath);
});
