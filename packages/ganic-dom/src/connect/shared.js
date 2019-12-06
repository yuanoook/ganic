const namespaceMap = {
  'svg': 'http://www.w3.org/2000/svg',
};

let usedNamespace = false;

const getNamespace = (tagName, node) => {
  if (namespaceMap[tagName]) {
    node.namespace = namespaceMap[tagName];
    usedNamespace = true;
    return node.namespace;
  }

  if (!usedNamespace) {
    return;
  }

  let ancestor = node && node.parent;
  while (ancestor) {
    if (ancestor.namespace) {
      node.namespace = ancestor.namespace;
      return node.namespace;
    }
    ancestor = ancestor.parent;
  }
};

module.exports = {
  getNamespace,
  organDomMap: new Map(),
  leafDomMap: new Map(),
};
