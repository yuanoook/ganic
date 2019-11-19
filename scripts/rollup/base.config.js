const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const minify = require('rollup-plugin-babel-minify');

const name = ['ganic'][0];
const input = `packages/${name}/index.js`;
const exportFile = `build/node_modules/${name}/umd/${name}`;

const plugins = [
  nodeResolve({
    mainFields: ['module', 'main', 'browser'],
  }),
  commonjs({
    exclude: ['node_modules/foo/**', 'node_modules/bar/**'],
    extensions: ['.js'],
    ignoreGlobal: false,
    sourceMap: false,
    ignore: ['conditional-runtime-dependency'],
  }),
  babel({
    exclude: 'node_modules/**',
  }),
];

const output = {
  file: `${exportFile}-production.js`,
  format: 'umd',
  name: 'Ganic',
};

const normal = {input, plugins, output};

const minified = {
  input,
  plugins: plugins.concat([
    minify({
      removeConsole: true,
      removeDebugger: true,
      comments: false,
    }),
  ]),
  output: {
    ...output,
    file: `${exportFile}-production.min.js`,
  },
};

module.exports = [
  normal,
  minified,
];
