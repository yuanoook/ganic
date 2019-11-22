const fs = require('fs');
const {bash, getPackages} = require('../shared/utils');
const {getConfig} = require('./config');

const sourceDir = name => `packages/${name}/`;
const targetDir = name => `build/node_modules/${name}/`;
const buildOne = async c => await (await require('rollup').rollup(c)).write(c.output);
const buildAll = async names => {
  const configs = names.reduce((list, name) => [...list, ...getConfig(name)], []);
  await Promise.all(configs.map(buildOne));
};

const getGanicVersion = () => readPackage('ganic').version;
const readPackage = name => require(`../../packages/${name}/package.json`);
const writePackage = (target, package) => fs.writeFileSync(
  require('path').resolve(__dirname, `../../package/${target}/package.json`),
  JSON.stringify(package, null, 2)
);

const updatePackageDeps = (target, deps) => {
  const package = readPackage(target);
  package.dependencies = Object.assign({}, package.dependencies, deps);
  writePackage(target, package);
}

const updatePackages = async () => {
  const names = (await getPackages()).filter(name => name !== 'ganic');
  await Promise.all(names.map(name => updatePackageDeps(name, {
    ganic: getGanicVersion(),
  })));
}

const syncFiles = async name => {
  await Promise.all([
    'LICENSE',
    'readme.md',
  ].map(file =>
    bash(`cp -r ${file} ${targetDir(name)}`)
  ));

  await bash(`cp -r ${sourceDir(name)}package.json ${targetDir(name)}package.json`);
  await Promise.all([
    'index.js',
  ].map(file =>
    bash(`cp -r ${sourceDir(name)}../shared/${file} ${targetDir(name)}`)
  ));
};

const updateIndex = async name => {
  const dist = require('path').resolve(__dirname, `../../build/node_modules/${name}/index.js`);
  fs.writeFileSync(
    dist,
    fs.readFileSync(dist, {encoding: 'utf-8'}).replace(/\[name\]/g, name)
  );
};

const afterBuild = async (name) => {
  await syncFiles(name);
  await updateIndex(name);
}

const start = async () => {
  const names = await getPackages();
  await buildAll(names);
  await Promise.all(names.map(afterBuild));
}

start();
