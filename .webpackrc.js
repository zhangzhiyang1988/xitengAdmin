const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: true,
  publicPath: '/', //h5
  hash: true,
  proxy: {
    '/xitenggamejar': {
      //target: 'http://192.168.1.226:9939/',
      //target: 'http://123.57.161.212:9939/',
      target: 'https://www.xiteng.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/picture': {
      target: 'http://123.57.161.212:9936/imageserver/',
      changeOrigin: true,
      pathRewrite: { '^/picture': '' },
    },
  },
};
