const List = props => props;

const getOrganKit = (desc, tree) => {
  const organism = desc && desc.organism;
  if (!organism) {
    return;
  }
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
  index,
  relationship,
}) => {
  let { organism, onReady } = getOrganKit(desc, tree) || {};
  let node;
  if (organism) {
    node = new OrganNode({
      organ: new Organ({organism, props: desc.props}),
      parent,
      tree,
      index,
      relationship,
    });
  } else {
    node = new OrganLeaf({
      value: desc,
      parent,
      tree,
      relationship,
    });
    onReady = () => node.update();
  }
  return {node, onReady};
};

module.exports = {
  List,
  getOrganKit,
  createNode,
};
