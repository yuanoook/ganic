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
  const exportFile = (type, min) => `build/node_modules/${name}/${type}/${name}.${
    min ? 'production.min' : 'development'
  }.js`;

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
    babel(),
  ];

  const productionPlugins = plugins.concat([
    minify({
      removeConsole: true,
      removeDebugger: true,
      comments: false,
    }),
  ]);

  const output = {
    file: exportFile('umd', false),
    format: 'umd',
    name: nameMap[name],
    exports: 'named',
    globals,
  };

  const umdDevelopment = {external, input, plugins, output};

  const umdProduction = {
    external,
    input,
    plugins: productionPlugins,
    output: {
      ...output,
      file: exportFile('umd', true),
    },
  };

  const cjsDevelopment = {
    external,
    input,
    plugins,
    output: {
      ...output,
      file: exportFile('cjs', false),
      format: 'cjs',
      globals: {}
    }
  };

  const cjsProduction = {
    ...cjsDevelopment,
    plugins: productionPlugins,
    output: {
      ...cjsDevelopment.output,
      file: exportFile('cjs', true)
    }
  }

  return [
    umdDevelopment,
    umdProduction,
    cjsDevelopment,
    cjsProduction,
  ];
}

module.exports = {
  getConfig,
  externalMap,
};
