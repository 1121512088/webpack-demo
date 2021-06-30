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
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        exclude: /\.module\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // modules: true,
              modules: {
                mode: "local", // 使用 `local` 同使用 `modules: true` 的效果是一样的
                localIdentName: "dev-[name]-[local]", // page up element show classname
                // getLocalIdent: (context, localIdentName, localName, options) => { // 覆盖 localIdentName
                //   if (
                //     context.resourcePath.includes('node_modules') ||
                //     context.resourcePath.includes('global.less')
                //   ) {
                //     return localName;
                //   }
                //   return `myApp-${localName}`;
                // },
              }
            }
          },
          'less-loader',
          {
            loader: 'postcss-loader', // 自动获取浏览器前缀 兼容  // .less 给个属性dispatch: flex 能看到兼容
            options: {
              postcssOptions: {
                plugins: {
                  'postcss-preset-env': {
                    browsers: ['last 30 versions', "> 2%", "Firefox >= 10", "ie 6-11"] // 兼容浏览器
                  },
                },
              },
            },
          },
        ]
      },
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin({
    //   analyzerHost: "127.0.0.1",
    //   analyzerPort: "8888"
    // })
  ],
  devServer: { // 配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件
    contentBase: './dist',
    hot: true,
    port: 8887, // default: 8080
    open: true, // 打开浏览器
    overlay: { // default: false  // 编译错误或警告浏览器中显示全屏覆盖
      warnings: false,
      errors: true,
    },
    /* 
     * can add
    */
    host: "localhost", // default: "localhost"
    // openPage: "/admin",// 指定打开浏览器时要浏览的页面。
    headers: {}, // 为所有请求添加响应标头
    onListening: function (server) { // 监听端口上的连接时，执行自定义功能
      const port = server.listeningApp.address().port;
      console.log('Listening on port:', `localhost:${port}`);
    },
    // useLocalIp: true, // 使host 本机电脑 IP 打开
    proxy: { // 代理接口服务 请求 /api/users 相当于 http://34.203.100.217:8082/api/users request: fetch("/api/test")
      '/api': {
        target: 'http://34.203.100.217:8082',// 这个是被替换的目标地址 tip: 网页请求 还是显示localhost 请求 其实已经代理
        changeOrigin: true, // 默认是false, 如果需要代理需要改成true
        // secure: false, // 如果是https接口，需要配置这个参数
      },
    },
    /* 
     *
    */
  },
})
