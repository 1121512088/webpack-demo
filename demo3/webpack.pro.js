const webpack = require('webpack');
const { merge } = require('webpack-merge');
const config = require("./webpack.config");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 生产环境目标 
// 1. 压缩 bundle、
// 2. 更轻量的 source map
// 3. 资源优化等
// 4. 生产环境下默认使用 TerserPlugin压缩代码

module.exports = merge(config, {
  output: {
    clean: true // webpack >= 5.20 才有用 清理 /dist 文件夹  省略掉 clean-webpack-plugin
  },
  devtool: "source-map",
  mode: "production",
  plugins: [
    // new CleanWebpackPlugin({  // webpack5.20废弃:  后 打包前清理 dist
    //   cleanStaleWebpackAssets: false // 在(npm run watch)webpack --watch 模式下 默认会将没有改变的html文件清除
    // }),
    // new UglifyJSPlugin({
      // sourceMap: true, // 产生 .map文件 sourceMap 可定位错误位置
    // }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("production"),
    }),
  ],
  // TODO: ----------------------------------------------- 简化  根据指南 代码分离 优化
  optimization: {
    moduleIds: 'deterministic', // deterministic 在不同的编译中不变的短数字 id。有益于长期缓存。
    runtimeChunk: 'single', // runtime 代码拆分为一个单独的 chunk 将其设置为 single 来为所有 chunk 创建一个 runtime bundle
    // 将第三方库(library) （例如 lodash 或 react）提取到单独的 vendor chunk 文件中，
    // 是比较推荐的做法，这是因为，它们很少像本地的源代码那样频繁修改。
    splitChunks: { // optimization.splitChunks 取代了 webpack v4 版本以下的 CommonsChunkPlugin
      // splitChunks.cacheGroups 缓存组可以继承和/或覆盖来自 splitChunks.* 的任何选项。但是 test、priority 和 reuseExistingChunk
      // 只能在缓存组级别上进行配置。将它们设置为 false以禁用任何默认缓存组。
      cacheGroups: {
        vendor: { // 创建一个 custom vendor chunk
          test: /[\\/]node_modules[\\/]/, // 排除node_modules文件的编译
          name: 'vendors', // build  新建vendors 文件
          chunks: 'all',
        }
      }
    }
  },
  // stats: {
  //   children: false, // 不输出子模块的打包信息
  // },
})
