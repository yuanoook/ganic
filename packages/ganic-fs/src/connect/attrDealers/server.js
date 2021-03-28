const descriptors = require('../descriptor');
const { input, output } = require('./util');

const __dealer = Symbol();

function getConnection ({
  organ,
  tagName,
  server,
  fullName,
}) {
  if (organ[__dealer]) {
    return organ[__dealer];
  }

  const descriptor = descriptors[tagName]({
    organ,
    fullName,
    creature: server,
  });

  server.on('connection', async client => {
    client.setEncoding('utf8');

    if (organ[__dealer].greeting) {
      output(client, () => organ[__dealer].greeting(descriptor, client));
    }

    client.on('data', async data => {
      if (organ[__dealer].io) {
        output(client, await organ[__dealer].io(
          input(data),
          descriptor,
          client,
        ));
      }
    });
  });

  return organ[__dealer] = {};
}

function io ({
  tagName,
  organ,
  fullName,
  creature: server,
  value,
}) {
  getConnection({
    organ,
    tagName,
    server,
    fullName,
  }).io = value;
}

function greeting ({
  tagName,
  organ,
  fullName,
  creature: server,
  value,
}) {
  getConnection({
    organ,
    tagName,
    server,
    fullName,
  }).greeting = value;
}

module.exports = {
  io,
  hi: greeting,
  greeting,
};
