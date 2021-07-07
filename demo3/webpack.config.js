const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const staticPath = "static";
module.exports = {
  entry: {
    index: {
      import: "./src/index",
      filename: `${staticPath}/js/[name].[contenthash].js`,
      dependOn: 'lodash',
    },
    sample: {
      import: "./src/sample.jsx",
      filename: `${staticPath}/js/[name].[contenthash].jsx`,
      dependOn: 'lodash',
    },
    lodash: 'lodash',
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test:  /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: { // 输出路径
          filename: `${staticPath}/images/[hash][ext][query]`
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ // 生成html 到 dist下
      title: "测试",
      inject: true, // default: true 是否将js放在body的末尾
    }),
    new ESLintPlugin(), // eslint + .eslintrc.js 1.监测代码 2. 开启vscode格式化代码 3. 等等
    // ProgressPlugin插件 === 在 package.json 命令增加 --progress(列子："start": "webpack serve --progress --config webpack.dev.js")
    // new webpack.ProgressPlugin(), // 启动进度条
  ],
  resolve: {
    modules: ['node_modules'], // webpack 解析模块时应该搜索的目录
    extensions: ['.js', '.jsx'], // 后缀名自动补全
    mainFiles: ['index'], // 默认 index文件名
    alias: { // 别名
      "@": path.resolve(__dirname, 'src'),
    },
  }
};
