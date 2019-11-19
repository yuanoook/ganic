import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';

const rootPath = '';
const input = `${rootPath}src/index.js`;

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
  file: `${rootPath}umd/ganic-production.js`,
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
    file: `${rootPath}umd/ganic-production.min.js`,
  },
};

export default [
  normal,
  minified,
];
