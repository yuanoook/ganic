module.exports = {
  'plugins': [
    ['@babel/plugin-transform-react-jsx', {
      'pragma': 'Ganic.createElement',
      'pragmaFrag': 'Ganic.Fragment',
      'throwIfNamespace': false,
    }],
  ],
  'presets': [
    [
      '@babel/preset-env',
      {
        'targets': '> 0.25%, not dead',
      },
    ],
  ],
};
