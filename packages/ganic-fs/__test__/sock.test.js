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
  let serverDb;
  let clientDb;
  let serverSock;
  let clientSock;

  const App = () => {
    const [size, setSize] = useState(0);

    serverDb = useRef(true);
    clientDb = useRef(true);
    serverSock = useRef(true);
    clientSock = useRef(true);

    const serverIO = i => {
      const serverState = {
        random: Math.random(),
        updatedAt: new Date(),
        ...i,
      };
      serverDb.json = serverState;
      return JSON.stringify(serverState, null, 2).length;
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
        <server name="echo.sock" ref={serverSock} io={serverIO}/>
      </dir>
      <dir name="client">
        <file name="client.db" ref={clientDb} onChange={onClientDbChange}/>
        <client name="../server/echo.sock" ref={clientSock} io={clientIO}/>
      </dir>
    </dir>;
  };
  render(<App />, __dirname);

  clientDb.json = {hello: 'world!'};

  const sizePath = () => path.resolve(
    __dirname, rootDir, `client-set-size-${serverDb.text.length}`);
  await expectFile(sizePath);

  clientSock.end();
  serverSock.close();
});
