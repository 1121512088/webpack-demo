const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
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
    ]
  },
}
