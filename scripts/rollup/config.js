const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const minify = require('rollup-plugin-babel-minify');

const nameMap = {
  'ganic': 'Ganic',
  'ganic-dom': 'GanicDOM',
  'ganic-tree': 'GanicTree',
  'ganic-usex': 'GanicUseX',
};

const externalMap = {
  'ganic': [],
  'ganic-dom': ['ganic'],
  'ganic-tree': ['ganic'],
  'ganic-usex': ['ganic'],
};

const globalsMap = {
  'ganic': {},
  'ganic-dom': {ganic: 'Ganic'},
  'ganic-tree': {ganic: 'Ganic'},
  'ganic-usex': {ganic: 'Ganic'},
};

const getConfig = name => {
  if (!nameMap[name]) {
    throw new Error(`Illegal package name: ${name}`);
  }

  const globals = globalsMap[name];
  const external = externalMap[name];
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
    name: nameMap[name],
    exports: 'named',
    globals,
  };

  const normal = {external, input, plugins, output};

  const minified = {
    external,
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

  return [
    normal,
    minified,
  ];
}

module.exports = {
  getConfig
};
