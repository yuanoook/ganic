// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';

const min = process.argv[process.argv.length - 1] === '--m';

let plugins = [
  nodeResolve({
    mainFields: ['module', 'main', 'browser']
  }),
  commonjs({
    exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],
    extensions: [ '.js' ],
    ignoreGlobal: false,
    sourceMap: false,
    ignore: [ 'conditional-runtime-dependency' ]
  }),
  babel({
    exclude: 'node_modules/**'
  })
];

plugins = min ? plugins.concat([
  minify({
    removeConsole: true,
    removeDebugger: true,
    comments: false
  })
]) : plugins;

export default {
  input: './src/index.js',
  output: {
    file: `./umd/ganic-production${min ? '.min' : ''}.js`,
    format: 'umd',
    name: 'Ganic'
  },
  plugins,
};