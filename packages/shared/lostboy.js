const findParent = (node, find) => {
    if (node.parent) {
      return find(node.parent) || findParent(node.parent, find);
    } else if (node.tree) {
      return node.tree.envRoot;
    }
    throw new Error(`Cannot find env parent`);
};

const findOnes = (node, find) => {
  const one = find(node);
  if (one) {
    return [one];
  }

  let child = node.firstChild;
  let ones = [];
  while (child) {
    ones = ones.concat(findOnes(child, find));
    child = child.nextSibling;
  }
  return ones;
};

const findPre = (node, find) => {
  if (node.preSibling) {
    return findBackward(node.preSibling, find) || findPre(node.preSibling, find);
  }
  if (node.parent) {
    return find(node.parent) ? null : findPre(node.parent, find);
  }
};

const findBackward = (node, find) => {
  let one = find(node);
  if (one) {
    return one;
  }

  let child = node.lastChild;
  while (child) {
    one = findBackward(child, find);
    if (one) {
      return one;
    }
    child = child.preSibling;
  }
};

module.exports = {
  findParent,
  findPre,
  findOnes,
};
