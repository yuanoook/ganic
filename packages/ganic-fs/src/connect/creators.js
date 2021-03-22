const fs = require('fs');
const path = require('path');
const dirExists = name => fs.existsSync(name) && fs.lstatSync(name).isDirectory();
const fileExists = name => fs.existsSync(name) && fs.lstatSync(name).isFile();
const socketExists = name => fs.existsSync(name) && fs.lstatSync(name).isSocket();
const linkExists = name => fs.existsSync(name) && fs.lstatSync(name).isSymbolicLink();

const dir = fullPathname => {
  if (!dirExists(fullPathname)) {
    return fs.mkdirSync(fullPathname, { recursive: true });
  }
};

const file = fullPathname => {
  if (!fileExists(fullPathname)) {
    // create dir if it does not exist
    dir(path.dirname(fullPathname));
    return fs.appendFileSync(fullPathname, '');
  }
};

const socket = fullPathname => {
  if (!socketExists(fullPathname)) {
    // TODO
  }
};

const link = fullPathname => {
  if (!linkExists(fullPathname)) {
    // TODO
  }
};

module.exports = {
  dir,
  file,
  socket,
  link,
};
