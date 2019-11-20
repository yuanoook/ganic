const {bash, getPackages} = require('../shared/utils');
const {getConfig, externalMap} = require('./config');
const rootPath = process.cwd().replace('\\','/').replace(/^([A-Z]):/, (m,A_Z) => '/' + A_Z.toLowerCase());

const sourceDir = name => `${rootPath}/packages/${name}/`;
const targetDir = name => `${rootPath}/build/node_modules/${name}/`;
const buildOne = async c => await (await require('rollup').rollup(c)).write(c.output);
const buildAll = async names => {
  const configs = names.reduce((list, name) => [...list, ...getConfig(name)], []);
  await Promise.all(configs.map(buildOne));
};

const syncFiles = async name => {
  await bash(`cp -r ${sourceDir(name)}package.json ${targetDir(name)}package.json`);
  await Promise.all([
    'LICENSE',
    // 'package.json',
    'readme.md',
    'index.js',
  ].map(file =>
    bash(`cp -r ${sourceDir(name)}../shared/${file} ${targetDir(name)}`)
  ));
};

const updatePackageJson = async name => {
  const src = `../../packages/${name}/package.json`;
  const dist = `../../build/node_modules/${name}/package.json`;
  const obj = require(src);
  obj.name = name;
  obj.version = require('../../package.json').version;
  console.log(obj);
  // obj.repository.directory = obj.repository.directory.replace(/[^\/]+$/, name);
  // obj.dependencies = externalMap[name].reduce((deps, depName) => ({...deps, [depName]: 'latest'}), {});
  require('fs').writeFileSync(
    require('path').resolve(__dirname, dist),
    JSON.stringify(obj, null, 2)
  );
};

const updateIndex = async name => {
  const fs = require('fs');
  const dist = require('path').resolve(__dirname, `../../build/node_modules/${name}/index.js`);
  fs.writeFileSync(
    dist,
    fs.readFileSync(dist, {encoding: 'utf-8'}).replace(/\[name\]/g, name)
  );
};

const afterBuild = async (name) => {
  await syncFiles(name);
  // await updatePackageJson(name);
  await updateIndex(name);
}

const start = async () => {
  const names = await getPackages();
  await buildAll(names);
  await Promise.all(names.map(afterBuild));
}

start();
