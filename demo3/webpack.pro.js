
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const config = require("./webpack.config");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = (merge, {
  devtool: "source-map",
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true, // 产生 .map文件 sourceMap 可定位错误位置
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("production"),
    }),
  ]
})
