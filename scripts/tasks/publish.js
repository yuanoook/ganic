const bash = require('util').promisify(require('child_process').exec);
const name = process.argv[process.argv.length - 1];

if (![
  'ganic'
].includes(name)) {
  throw new Error(`Please provide a proper package name!`);
}

const folder = `build/node_modules/${name}`;
bash(`npm publish ${folder} --access public`);
