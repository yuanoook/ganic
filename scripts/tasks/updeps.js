const fs = require('fs');
const {getPackages} = require('../shared/utils');

const getGanicVersion = () => readPackage('ganic').version;
const readPackage = name => require(`../../packages/${name}/package.json`);
const writePackage = (target, package) => fs.writeFileSync(
  require('path').resolve(__dirname, `../../packages/${target}/package.json`),
  JSON.stringify(package, null, 2)
);

const plusVersion = version => {
  const [major, minor, patch] = version.split('.');
  return [major, minor, (+patch) + 1].join('.');
}

const updatePackageDeps = (target, deps) => {
  const package = readPackage(target);
  const toUpdateKeys = Object.keys(deps).filter(key => (
    /^\d+\.\d+\.\d+$/.test(package.dependencies[key])
    && deps[key] !== package.dependencies[key])
  );
  if (!toUpdateKeys.length) {
    return;
  }
  const toUpdateDeps = toUpdateKeys.reduce((prev, key) => ({
    ...prev, [key]: deps[key]
  }), {});
  package.dependencies = Object.assign({}, package.dependencies, toUpdateDeps);
  package.version = plusVersion(package.version);
  writePackage(target, package);
}

const updateDependencies = async () => {
  const ganicVersion = getGanicVersion();
  const names = (await getPackages()).filter(name => name !== 'ganic');
  names.map(name => updatePackageDeps(name, {ganic: ganicVersion}));
}

updateDependencies();
