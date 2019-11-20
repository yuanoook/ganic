const fs = require('fs');
const path = require('path');
const { getPackages } = require('../shared/utils');

const source = name => path.resolve(`packages/${name}`);
const link = name => path.resolve(`node_modules/${name}`);
const unlink = name => fs.unlinkSync(link(name));
const symlink = name => fs.symlinkSync(source(name), link(name), 'junction');

const start = async () => {
  const names = await getPackages();
  await Promise.all(names.map(unlink));
  await Promise.all(names.map(symlink));
}

start();
