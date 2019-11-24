const fs = require('fs');
const {getPackages} = require('../shared/utils');

const getGanicVersion = () => readPackage('ganic').version;
const readPackage = (name, dir = '../../packages/') => require(`${dir}${name}/package.json`);
const writePackage = (target, package, dir = '../../packages/') => fs.writeFileSync(
  require('path').resolve(__dirname, `${dir}${target}/package.json`),
  JSON.stringify(package, null, 2)
);

const plusVersion = version => {
  const [major, minor, patch] = version.split('.');
  return [major, minor, (+patch) + 1].join('.');
}

const updatePackageDeps = ({
  target,
  deps,
  dir = '../../packages/',
  depsKey = 'dependencies',
}) => {
  const package = readPackage(target, dir);
  const toUpdateKeys = Object.keys(deps).filter(key => (
    /^\^?\d+\.\d+\.\d+$/.test(package[depsKey][key])
    && ('^' + deps[key]) !== package[depsKey][key])
  );
  if (!toUpdateKeys.length) {
    return;
  }
  const toUpdateDeps = toUpdateKeys.reduce((prev, key) => ({
    ...prev, [key]: '^' + deps[key]
  }), {});
  package[depsKey] = Object.assign({}, package[depsKey], toUpdateDeps);
  package.version = plusVersion(package.version);
  writePackage(target, package, dir);
}

const updatePeerDependencies = async () => {
  const ganicVersion = getGanicVersion();
  const names = (await getPackages()).filter(name => name !== 'ganic');
  names.map(name => updatePackageDeps({
    target: name,
    deps: {ganic: ganicVersion},
    depsKey: 'peerDependencies'
  }));
}

const updateCodesandboxDeps = async () => {
  const names = await getPackages();
  const deps = names.reduce((prev, name) => ({
    ...prev, [name]: readPackage(name).version
  }),{});
  updatePackageDeps({
    target: 'example',
    deps,
    dir: `../../.codesandbox/`
  });
}

const start = async () => {
  await updatePeerDependencies();
  await updateCodesandboxDeps();
}

start();
