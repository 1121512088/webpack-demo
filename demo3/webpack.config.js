const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// webpack ul 可视化包工具
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({ // 生成html 到 dist下
      title: "测试"
    }),
    new BundleAnalyzerPlugin({
      analyzerHost: "127.0.0.1",
      analyzerPort: "8888"
    })
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
};
