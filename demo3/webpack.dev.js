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
    hot: true,
    port: 8888, // default: 8080
    open: true, // 打开浏览器
    overlay: { // default: true  // 编译错误或警告浏览器中显示全屏覆盖
      warnings: false,
      errors: true,
    },
    // can add
    host: "localhost", // default: "localhost"
    openPage: "admin/home",// 指定打开浏览器时要浏览的页面。
    headers: {}, // 为所有请求添加响应标头
    onListening: function (server) { // 监听端口上的连接时，执行自定义功能
      const port = server.listeningApp.address().port;
      console.log('Listening on port:', `localhost:${port}`);
    },
    proxy: { // 代理接口服务 请求 /api/users 相当于 http://localhost:3000/api/users
      '/api': 'http://localhost:3000',
    },
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin({
    //   analyzerHost: "127.0.0.1",
    //   analyzerPort: "8888"
    // })
  ]
})
