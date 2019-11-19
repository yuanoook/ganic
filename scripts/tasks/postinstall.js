const bash = require('util').promisify(require('child_process').exec);
const path = require('path');

const source = name => path.resolve(`packages/${name}`);
const link = name => path.resolve(`node_modules/${name}`);
const symlink = name => require('fs').symlinkSync(source(name), link(name), 'junction');

const start = async () => {
  const {stdout: packages} = await bash('ls packages');
  const names = packages.split('\n').map(x => x.trim()).filter(x => /^ganic/.test(x));
  Promise.all(names.map(symlink));
}

start();
