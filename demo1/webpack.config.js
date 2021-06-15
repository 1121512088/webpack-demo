const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // webpack >= 5.20 才有用 清理 /dist 文件夹 
    // webpack5 => 默认情况下 asset/resource(图片，文字)模块以 [hash][ext][query] 文件名发送到输出目录
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  mode: "production",
  module: {
    rules: [
      { // less
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      // 图片
      // { 
      //   test: /\.(png|jpg|svg|gif)$/,
      //   use: 'file-loader',
      // },
      // 文字
      // { 
      //   test: /\.(woff|woff2|eot|ttf|otf)$/,
      //   use: ['file-loader'],
      // },

      // webpack 5 :
      // 图片
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // 文字
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      // svg 使用方式
      // import metroMap from './images/metro.svg';
      // block.style.background = `url(${metroMap})`
      // 所有 .svg 文件都将作为 data URI 注入到 bundle 中
      // inline 资源
      {
        test: /\.svg/,
        type: 'asset/inline'
      },
      
    ]
  },
}
