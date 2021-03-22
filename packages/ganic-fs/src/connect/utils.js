const path = require('path');
const creators = require('./creators');
const { organMap } = require('./shared');
const getTagFileDesc = node => organMap.get(node.organ);

const getFullPathname = node => {
  const rawPaths = [];
  const envRoot = node.tree.envRoot;
  while (node) {
    rawPaths.unshift(getTagFileDesc(node));
    node = node.parent;
  }
  rawPaths.unshift(envRoot);

  const paths = rawPaths.filter(p => p)
    .map(p => typeof p === 'string' ? p : p.attrs.name);

  return path.resolve(...paths);
};

const insertFile = (fileDesc, node) => {
  const fullPathname = getFullPathname(node);
  creators[fileDesc.tagName](fullPathname);
};

const removeFile = () => {

};

module.exports = {
  getFullPathname,
  insertFile,
  removeFile,
};
