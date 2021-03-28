const file = require('./file');
const creature = require('./creature');

module.exports = {
  dir: file,
  file,
  server: creature,
  client: creature,
};
