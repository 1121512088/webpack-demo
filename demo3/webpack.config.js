const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({ // 生成html 到 dist下
      title: "测试"
    }),
    new CleanWebpackPlugin({  // 打包前清空 dist
      cleanStaleWebpackAssets: false // 在(npm run watch)webpack --watch 模式下 默认会将没有改变的html文件清除
    }),
    new HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          "style-loader", // 顺序先
          "css-loader",
          "less-loader",
        ]
      },
    ]
  },
}
