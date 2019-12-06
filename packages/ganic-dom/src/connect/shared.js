const nameSpaceStack = [];
const nameSpaceMap = {
  'svg': 'http://www.w3.org/2000/svg',
};

const nameSpace = {
  enter: tagName => {
    if (nameSpaceMap[tagName]) {
      nameSpaceStack.push(nameSpaceMap[tagName]);
    }
  },
  leave: tagName => {
    if (nameSpaceMap[tagName]) {
      nameSpaceStack.pop();
    }
  },
  get: () => nameSpaceStack[nameSpaceStack.length - 1],
};

module.exports = {
  nameSpace,
  organDomMap: new Map(),
  leafDomMap: new Map(),
};
