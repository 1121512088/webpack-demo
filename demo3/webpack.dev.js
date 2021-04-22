const { merge } = require('webpack-merge');
const config = require("./webpack.config");
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = merge(config, {
  devtool: 'inline-source-map',
  devServer: { // 配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件
    contentBase: './dist',
    hot: true,
  },
  plugins: [
    new HotModuleReplacementPlugin(),
  ]
})
