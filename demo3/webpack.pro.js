const webpack = require('webpack');
const { merge } = require('webpack-merge');
const config = require("./webpack.config");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

// 生产环境目标 
// 1. 压缩 bundle、
// 2. 更轻量的 source map
// 3. 资源优化等
// 4. 生产环境下使用 TerserPlugin压缩代码

const staticPath = "static/";

module.exports = merge(config, {
  output: {
    clean: true, // webpack >= 5.20 才有用 清理 /dist 文件夹  省略掉 clean-webpack-plugin
  },
  devtool: "source-map",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        exclude: /\.module\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // loader + plugins  tip: css style 代码从打包的js 里面区分出来 生成css
            options: {
              publicPath: "../../", // 为 CSS 内的图片、文件等 设置引入 路径
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: "local",
                localIdentName: "production-[name]-[local]", // page up element show classname
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
    // new CleanWebpackPlugin({  // webpack5.20废弃:  后 打包前清理 dist
    //   cleanStaleWebpackAssets: false // 在(npm run watch)webpack --watch 模式下 默认会将没有改变的html文件清除
    // }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("production"),
    }),
    new MiniCssExtractPlugin({
      filename: `${staticPath}css/[name].css`, // 输出的每个 CSS 文件的名称
      // chunkFilename: `${staticPath}css/[id].css`, // 非入口的 chunk 
    }),
    new WebpackManifestPlugin({ // 生成一份资源清单，为后端渲染服务
      fileName: "assets-manifest.json",
      publicPath: "./",
    }),
  ],
  optimization: {
    moduleIds: 'deterministic', // deterministic 在不同的编译中不变的短数字 id。有益于长期缓存。
    runtimeChunk: 'single', // runtime 代码拆分为一个单独的 chunk 将其设置为 single 来为所有 chunk 创建一个 runtime bundle
    // 将第三方库(library) （例如 lodash 或 react）提取到单独的 vendor chunk 文件中，是比较推荐的做法，这是因为，它们很少像本地的源代码那样频繁修改。
    splitChunks: { // optimization.splitChunks 取代了 webpack v4 版本以下的 CommonsChunkPlugin
      // splitChunks.cacheGroups 缓存组可以继承和/或覆盖来自 splitChunks.* 的任何选项。但是 test、priority 和 reuseExistingChunk 只能在缓存组级别上进行配置。将它们设置为 false以禁用任何默认缓存组。
      cacheGroups: {
        vendor: { // 创建一个 custom vendor chunk
          test: /[\\/]node_modules[\\/]/, // 排除node_modules文件的编译
          name: 'vendors', // build  新建vendors 文件
          chunks: 'all',
        }
      }
    },
    // minimize: true, // 如开发环境下启用 CSS 优化可开启
    minimizer: [
      new CssMinimizerPlugin({ // 压缩 css
        parallel: true, // 使用多进程并发运行以提高构建速度
      }),
      new TerserPlugin({ // 压缩js
        parallel: true, // 使用多进程并发运行以提高构建速度
        test: /\.(js|jsx)(\?.*)?$/i,
        exclude: /\/node_modules/,
        extractComments: true, // 启用/禁用剥离注释功能。
      }),
    ],
  },
  // stats: {
  //   children: false, // 不输出子模块的打包信息
  // },
})
