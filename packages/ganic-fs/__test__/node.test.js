const Ganic = require('ganic');
const { useMemo, useRef } = require('ganic-usex');

const fs = require('fs');
const path = require('path');

const { render } = require('../index');

jest.setTimeout(30 * 1000);
beforeEach(() => {
  // fs.rmdirSync(path.resolve(__dirname, 'fs-test'), { recursive: true });
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



  it('should handle sock file', (done) => {
    let clientDb;

    const App = () => {
      const serverDb = useRef(true);
      clientDb = useRef(true);
      const clientSock = useRef(true);

      const onClientDbChange = useMemo(() => {
        done();
        // clientSock.send(clientDb.json);
      });

      const onServerMessage = useMemo((msg) => {
        serverDb.text = msg;
      });

      return <dir name="fs-test-proxy">
        <dir name="server">
          <file name="server.db" ref={serverDb} />
          <socket name="echo.sock" type="server" onMessage={onServerMessage}/>
        </dir>
        <dir name="client">
          <file name="client.db" ref={clientDb} onChange={onClientDbChange}/>
          <socket name="echo.sock" type="client" ref={clientSock}/>
        </dir>
      </dir>;
    };

    render(<App />, __dirname);

    clientDb.json = {hello: 'world!'};
  });
});
