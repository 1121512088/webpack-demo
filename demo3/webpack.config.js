const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: {
      import: "./src/index",
      filename: 'static/js/[name].[contenthash].js',
      dependOn: 'lodash',
    },
    sample: {
      import: "./src/sample.jsx",
      filename: 'static/js/[name].[contenthash].jsx',
      dependOn: 'lodash',
    },
    lodash: 'lodash',
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({ // 生成html 到 dist下
      title: "测试",
      inject: true, // 是否将js放在body的末尾
    }),
    // ProgressPlugin插件 === 在 package.json 命令增加 --progress(列子："start": "webpack serve --progress --config webpack.dev.js")
    // new webpack.ProgressPlugin(), // 启动进度条
  ],
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
              // modules: true,
              modules: {
                mode: "local", // 使用 `local` 同使用 `modules: true` 的效果是一样的
                localIdentName: "appTest-[name]-[local]", // page up element show classname
                // getLocalIdent: (context, localIdentName, localName, options) => { // 覆盖 localIdentName
                //   if (
                //     context.resourcePath.includes('node_modules') ||
                //     context.resourcePath.includes('global.less')
                //   ) {
                //     return localName;
                //   }
                //   return `myApp-${localName}`;
                // },
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
  resolve: {
    modules: ['node_modules'], // webpack 解析模块时应该搜索的目录
    extensions: ['.js', '.jsx', '.json'], // 后缀名自动补全
    alias: { // 别名
      "@": path.resolve(__dirname, 'src'),
    }
  }
};
