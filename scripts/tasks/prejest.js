/**
 * Remove all the node_modules under packages
 * They may were mis-installed by codesandbox ci
 */

const { bash, getPackages } = require('../shared/utils');

const source = name => `./packages/${name}/node_modules`;
const unlink = name => bash(`rm -rf ${source(name)}`);

const start = async () => {
  const names = await getPackages();
  await Promise.all(names.map(unlink));
}

start();
