const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const config = require('./webpack.config.js');

const staticPath = "static";
const version = new Date().getTime();

module.exports = merge(config, {
  output: {
    clean: true,
  },
  devtool: "source-map",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        exclude: /\.module\.less/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../../",
            }
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "production-[name]-[local]", // page up element show classname
              }
            }
          },
          "less-loader",
          {
            loader: 'postcss-loader',
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
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("production"),
    }),
    new MiniCssExtractPlugin({
      filename: `${staticPath}/css/[name].${version}.css`,
    }),
    new WebpackManifestPlugin({
      fileName: "assets-manifest.json",
      publicPath: "./",
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    },
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
      }),
      new TerserPlugin({
        parallel: true,
        test: /\.(js|jsx)(\?.*)?$/i,
        exclude: /\/node_modules/,
        extractComments: true,
      }),
    ],
  },
});
