
function io ({creature: client, value: ioFn}) {
  client.setEncoding('utf8');
  client.on('data', async data => {
    try {
      data = JSON.parse(data);
    } catch (e) {}
    let result = await ioFn(data);
    if (typeof result !== 'string') {
      result = JSON.stringify(result);
    }
    client.write(result);
  });
}

module.exports = {
  io,
};
