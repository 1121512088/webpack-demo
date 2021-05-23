const { merge } = require('webpack-merge');
const config = require("./webpack.config");
const { HotModuleReplacementPlugin } = require('webpack');
// webpack ul 可视化包工具
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// 在开发环境中，我们需要：
// 1. 强大的 source map 
// 2. hot module replacement(热模块替换)
// 3. localhost server

module.exports = merge(config, {
  mode: "development",
  devtool: 'inline-source-map',
  devServer: { // 配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件
    contentBase: './dist',
    port: 8888,
    hot: true,
    open: true, // 打开浏览器
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin({
    //   analyzerHost: "127.0.0.1",
    //   analyzerPort: "8888"
    // })
  ]
})
