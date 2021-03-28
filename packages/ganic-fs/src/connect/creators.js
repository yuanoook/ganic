const fs = require('fs');
const net = require('net');
const path = require('path');
const dirExists = name => fs.existsSync(name) && fs.lstatSync(name).isDirectory();
const fileExists = name => fs.existsSync(name) && fs.lstatSync(name).isFile();
const socketExists = name => fs.existsSync(name) && fs.lstatSync(name).isSocket();
const linkExists = name => fs.existsSync(name) && fs.lstatSync(name).isSymbolicLink();

const dir = (fullName) => {
  if (!dirExists(fullName)) {
    return fs.mkdirSync(fullName, { recursive: true });
  }
};

const file = (fullName) => {
  if (!fileExists(fullName)) {
    // create dir if it does not exist
    dir(path.dirname(fullName));
    return fs.appendFileSync(fullName, '');
  }
};

const server = (fullName) => {
  if (socketExists(fullName) || fileExists(fullName)) {
    fs.rmSync(fullName);
  }

  return net.createServer().listen(fullName, () => {
    // eslint-disable-next-line no-console
    console.log(`server bound on ${fullName}`);
  });
};

const client = (fullName) => {
  if (!socketExists(fullName)) {
    console.warn(`Sock file ${fullName} not ready!`);
  }

  return net.connect(fullName, () => {
    // eslint-disable-next-line no-console
    console.log(`connected to server ${fullName}`);
  }).setEncoding('utf8');
};

const link = fullName => {
  if (!linkExists(fullName)) {
    // TODO
  }
};

module.exports = {
  dir,
  file,
  server,
  client,
  link,
};
