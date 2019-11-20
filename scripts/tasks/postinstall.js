const {getPackages} = require('../shared/utils');
const path = require('path');

const source = name => path.resolve(`packages/${name}`);
const link = name => path.resolve(`node_modules/${name}`);
const symlink = name => require('fs').symlinkSync(source(name), link(name), 'junction');

const start = async () => {
  const names = await getPackages();
  Promise.all(names.map(symlink));
}

start();
