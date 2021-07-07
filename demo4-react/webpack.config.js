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
                '@babel/preset-react'
              ]
            }
          }
        ]
      },
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
