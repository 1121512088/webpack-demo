const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: "./src/index.js",
    print: "./src/print.js"
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
      cleanStaleWebpackAssets: false // 在webpack --watch 模式下 默认会将没有改变的html文件清除
    }),
  ],
  devtool: 'inline-source-map',
  devServer: { // 配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件
    contentBase: './dist',
  }
}
