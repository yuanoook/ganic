const fs = require('fs');
const net = require('net');
const path = require('path');
const dirExists = name => fs.existsSync(name) && fs.lstatSync(name).isDirectory();
const fileExists = name => fs.existsSync(name) && fs.lstatSync(name).isFile();
const socketExists = name => fs.existsSync(name) && fs.lstatSync(name).isSocket();
const linkExists = name => fs.existsSync(name) && fs.lstatSync(name).isSymbolicLink();

const dir = (fullPathname) => {
  if (!dirExists(fullPathname)) {
    return fs.mkdirSync(fullPathname, { recursive: true });
  }
};

const file = (fullPathname) => {
  if (!fileExists(fullPathname)) {
    // create dir if it does not exist
    dir(path.dirname(fullPathname));
    return fs.appendFileSync(fullPathname, '');
  }
};

const server = (fullPathname) => {
  if (socketExists(fullPathname) || fileExists(fullPathname)) {
    fs.rmSync(fullPathname);
  }

  return net.createServer().listen(fullPathname, () => {
    // eslint-disable-next-line no-console
    console.log(`server bound on ${fullPathname}`);
  }).setEncoding('utf8');
};

const client = (fullPathname) => {
  if (!socketExists(fullPathname)) {
    console.warn(`Sock file ${fullPathname} not ready!`);
  }

  return net.connect(fullPathname, () => {
    // eslint-disable-next-line no-console
    console.log(`connected to server ${fullPathname}!`);
  }).setEncoding('utf8');
};

const link = fullPathname => {
  if (!linkExists(fullPathname)) {
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
