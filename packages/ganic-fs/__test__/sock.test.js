const Ganic = require('ganic');
const { useRef } = require('ganic-usex');

const fs = require('fs');
const path = require('path');
const { render } = require('../index');

const rootDir = 'fs-test-sock';
jest.setTimeout(30 * 1000);
beforeEach(() => {
  fs.rmdirSync(path.resolve(__dirname, rootDir), { recursive: true });
});

it('should handle sock file', () => {
  let clientDb;

  const App = () => {
    const serverDb = useRef(true);
    const clientSock = useRef(true);
    clientDb = useRef(true);

    const onClientDbChange = () => {
      // clientSock.send(clientDb.json);
    };

    const onServerMessage = msg => {
      serverDb.text = msg;
    };

    return <dir name={rootDir}>
      <dir name="server">
        <file name="server.db" ref={serverDb} />
        <socket name="echo.sock" type="server" onMessage={onServerMessage}/>
      </dir>
      <dir name="client">
        <file name="client.db" ref={clientDb} onChange={onClientDbChange}/>
        <socket name="../server/echo.sock" type="client" ref={clientSock}/>
      </dir>
    </dir>;
  };
  render(<App />, __dirname);

  clientDb.json = {hello: 'world!'};
});
