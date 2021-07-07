const { HotModuleReplacementPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const config = require("./webpack.config.js");

module.exports = merge(config, {
  mode: "development",
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        exclude: /\.module\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: "dev-[name]-[local]",
              }
            }
          },
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: {
                  'postcss-preset-env': {
                    browsers: ['last 30 versions', "> 2%", "Firefox >= 10", "ie 6-11"]
                  }
                }
              },
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
  devServer: {
    open: true,
    hot: true,
  },
});
