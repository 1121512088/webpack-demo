const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: {
      import: "./src/index",
      filename: 'static/js/[name].[contenthash].js',
      dependOn: 'lodash',
    },
    sample: {
      import: "./src/sample.jsx",
      filename: 'static/js/[name].[contenthash].jsx',
      dependOn: 'lodash',
    },
    lodash: 'lodash',
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({ // 生成html 到 dist下
      title: "测试"
    }),
    // ProgressPlugin插件 === 在 package.json 命令增加 --progress(列子："start": "webpack serve --progress --config webpack.dev.js")
    // new webpack.ProgressPlugin(), // 启动进度条
  ],
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader", // 顺序先 
        ]
      },
    ]
  },
  resolve: {
    modules: ['node_modules'], // webpack 解析模块时应该搜索的目录
    extensions: ['.js', '.jsx', '.json'], // 引入模块时不带扩展后缀 import a from "./a";
    alias: { // 别名
      "@": path.resolve(__dirname, 'src'),
    }
  }
};
