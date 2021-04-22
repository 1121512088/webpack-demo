const webpack = require('webpack');
const { merge } = require('webpack-merge');
const config = require("./webpack.config");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(config, {
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin({  // 打包前清空 dist
      cleanStaleWebpackAssets: false // 在(npm run watch)webpack --watch 模式下 默认会将没有改变的html文件清除
    }),
    new UglifyJSPlugin({
      // sourceMap: true, // 产生 .map文件 sourceMap 可定位错误位置
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("production"),
    }),
  ],
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    }
  }
})
