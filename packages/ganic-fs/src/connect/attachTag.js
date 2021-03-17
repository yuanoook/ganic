const { getUpdatingOrgan, attach } = require('ganic');
const fs = require('fs');
const { organMap } = require('./shared');
const { removeFile } = require('./utils');
const { taskify } = require('../../../shared/taskQueue');
const applyAttrs = require('./applyAttrs');

const dirExists = name => fs.existsSync(name) && fs.lstatSync(name).isDirectory();
const fileExists = name => fs.existsSync(name) && fs.lstatSync(name).isFile();
const socketExists = name => fs.existsSync(name) && fs.lstatSync(name).isSocket();
const linkExists = name => fs.existsSync(name) && fs.lstatSync(name).isSymbolicLink();

const creators = {
  dir: fullPathname => {
    if (!dirExists(fullPathname)) {
      return fs.mkdirSync(fullPathname, { recursive: true });
    }
  },
  file: fullPathname => {
    if (!fileExists(fullPathname)) {
      return fs.appendFileSync(fullPathname, '');
    }
  },
  socket: fullPathname => {
    if (!socketExists(fullPathname)) {
      // TODO
    }
  },
  link: fullPathname => {
    if (!linkExists(fullPathname)) {
      // TODO
    }
  },
};

const create = (tagName, fullPathname) => creators[tagName](fullPathname);

const engage = taskify((organ, tagName, attrs) => {
  let file = organMap.get(organ);
  let fullPathname = null; // TODO
  if (!file) {
    file = create(tagName, fullPathname);
    organMap.set(organ, file);
  }
  applyAttrs(file, attrs);
});

const release = taskify(organ => {
  const file = organMap.get(organ);
  organMap.delete(organ);
  if (file) {
    removeFile(file);
  }
});

const newParasitismByTag = tagName => attrs => {
  const organ = getUpdatingOrgan();
  engage(organ, tagName, attrs);
  return ({ ending }) => {
    if (ending) {
      release(organ);
    }
  };
};

const tagParasitismMap = {};
const parasitismFactory = tagName => {
  if (!tagParasitismMap[tagName]) {
    tagParasitismMap[tagName] = newParasitismByTag(tagName);
  }
  return tagParasitismMap[tagName];
};

const attachTag = (tagName, attrs) => attach(
  parasitismFactory(tagName), attrs,
);

module.exports = attachTag;
