const nameMap = {
  'ganic': 'Ganic',
  'ganic-dom': 'GanicDOM',
  'ganic-fs': 'GanicFS',
  'ganic-tree': 'GanicTree',
  'ganic-usex': 'GanicUseX',
  'ganic-pandora': 'GanicPandora',
  'ganic-dom-air': 'GanicDomAir',
};

const externalMap = {
  'ganic': [],
  'ganic-dom': ['ganic'],
  'ganic-fs': ['ganic', 'fs', 'path'],
  'ganic-tree': ['ganic'],
  'ganic-usex': ['ganic'],
  'ganic-pandora': ['ganic', 'ganic-usex'],
  'ganic-dom-air': ['ganic', 'ganic-usex', 'ganic-pandora'],
};

const globalsMap = {
  'ganic': {},
  'ganic-dom': {ganic: 'Ganic'},
  'ganic-fs': {
    ganic: 'Ganic',
    fs: 'fs',
    path: 'path'
  },
  'ganic-tree': {ganic: 'Ganic'},
  'ganic-usex': {ganic: 'Ganic'},
  'ganic-pandora': {
    'ganic': 'Ganic',
    'ganic-usex': 'GanicUseX',
  },
  'ganic-dom-air': {
    'ganic': 'Ganic',
    'ganic-usex': 'GanicUseX',
    'ganic-pandora': 'GanicPandora',
  },
};

module.exports = {
  nameMap,
  externalMap,
  globalsMap,
};
