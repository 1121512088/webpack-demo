const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const staticPath = `static`;

module.exports = {
  entry: './src/index.js',
  output: {
    filename: `js/[name].[contenthash].js`,
    path: path.resolve(`${__dirname}`, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
              plugins: [
                "@babel/plugin-transform-runtime", // 解决 async await
                "@babel/plugin-syntax-dynamic-import", // 懒加载 解析动态 import 语法
                [ // 支持装饰器 @
                  "@babel/plugin-proposal-decorators",
                  { "legacy": true }
                ],
                [ // 支持装饰器 @
                  "@babel/plugin-proposal-class-properties",
                  { "loose": true }
                ],
                // 该babel 不用下载  tip: webpack 编译出现大量提示 需要写入该插件
                ["@babel/plugin-proposal-private-methods", { "loose": true }]
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: { // 输出路径
          filename: `${staticPath}/images/[hash][ext][query]`
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'demo_4',
      inject: true,
      template: './src/document.ejs',
    }),
    // new webpack.ProgressPlugin(), // 启动进度条
    new ESLintPlugin(),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      '@': `${__dirname}/src`,
    }
  }
};
