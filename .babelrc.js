const path = require('path');

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          components: path.join(__dirname, './src/components'),
        },
      },
    ],
    [
      'import',
      {
        libraryName: 'antd',
        style: true, // or 'css'
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
};
