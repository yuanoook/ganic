const {bash, getPackages} = require('../shared/utils');
const {getConfig} = require('./config');
const rootPath = process.cwd().replace('\\','/').replace(/^([A-Z]):/, (m,A_Z) => '/' + A_Z.toLowerCase());

const sourceDir = name => `${rootPath}/packages/${name}/`;
const targetDir = name => `${rootPath}/build/node_modules/${name}/`;
const buildOne = async c => await (await require('rollup').rollup(c)).write(c.output);
const buildAll = async names => {
  const configs = names.reduce((list, name) => [...list, ...getConfig(name)], []);
  Promise.all(configs.map(buildOne));
};

const syncFiles = async name => {
  await bash(`cp -r ${sourceDir(name)}. ${targetDir(name)}`);
  await bash(`cp -r ${sourceDir(name)}../shared/. ${targetDir(name)}`);
};

const mvVersionFile = async name => {
  const dir = targetDir(name);
  const dist = `${dir}package.json`;
  await bash(`mv ${dir}package.json ${dist}`);
};

const updateVersion = async name => {
  const dist = `../../build/node_modules/${name}/package.json`;
  const obj = require(dist);
  obj.name = name;
  obj.version = require('../../package.json').version;
  obj.repository.directory = obj.repository.directory.replace(/[^\/]+$/, name);
  require('fs').writeFileSync(
    require('path').resolve(__dirname, dist),
    JSON.stringify(obj, null, 2)
  );
};

const afterBuild = async (name) => {
  await syncFiles(name);
  await mvVersionFile(name);
  await updateVersion(name);
}

const start = async () => {
  const names = await getPackages();
  await buildAll(names);
  await Promise.all(names.map(afterBuild));
}

start();
