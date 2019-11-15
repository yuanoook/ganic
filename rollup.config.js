// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';

export default {
  input: './src/index.js',
  output: {
    file: './umd/ganic-production.min.js',
    format: 'umd',
    name: 'Ganic'
  },
  plugins: [
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
    }),

    minify({
      removeConsole: true,
      removeDebugger: true,
      comments: false
    }),
  ]
};