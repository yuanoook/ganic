const descriptors = require('../descriptor');
const { input, output } = require('./util');

const __dealer = Symbol();

function getConnection ({
  organ,
  tagName,
  client,
  fullName,
}) {
  if (organ[__dealer]) {
    return organ[__dealer];
  }

  const descriptor = descriptors[tagName]({
    organ,
    fullName,
    creature: client,
  });

  client.setEncoding('utf8');

  client.on('connect', async () => {
    if (organ[__dealer].greeting) {
      output(client, await organ[__dealer].greeting(descriptor));
    }
  });

  client.on('data', async data => {
    if (organ[__dealer].io) {
      output(client, await organ[__dealer].io(
        input(data),
        descriptor,
      ));
    }
  });

  return organ[__dealer] = {};
}

function io ({
  tagName,
  organ,
  fullName,
  creature: client,
  value,
}) {
  getConnection({
    organ,
    tagName,
    client,
    fullName,
  }).io = value;
}

function greeting ({
  tagName,
  organ,
  fullName,
  creature: client,
  value,
}) {
  getConnection({
    organ,
    tagName,
    client,
    fullName,
  }).greeting = value;
}

module.exports = {
  io,
  hi: greeting,
  greeting,
};
