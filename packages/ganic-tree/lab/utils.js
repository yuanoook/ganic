const List = props => props;

const getUtilsByDesc = ({ organism } = {}, tree) => {
  if (typeof organism === 'function') {
    return { organism };
  }
  if (tree && typeof organism === 'string') {
    return tree.envRunner.getTagkit(organism);
  }
};

const createNode = ({
  constructors: {
    Organ,
    OrganNode,
    OrganLeaf,
  },

  desc,
  tree,
  parent,
  key,
  relationship,
}) => {
  let { organism, onReady } = getUtilsByDesc(desc, tree) || {};
  let node;
  if (organism) {
    node = new OrganNode({
      organ: new Organ({organism, props: desc.props}),
      parent,
      tree,
      key,
      relationship,
    });
  } else {
    node = new OrganLeaf({
      value: desc,
      parent,
      tree,
      key,
      relationship,
    });
    onReady = () => node.update();
  }
  return {node, onReady};
};

module.exports = {
  List,
  getUtilsByDesc,
  createNode,
};
