const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  optimization:{
    minimize: false // 关闭代码压缩，可选
  },

  entry: "./src/index.ts",

  devtool: "inline-source-map",

  devServer: {
    contentBase: './dist'
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    environment: {
      arrowFunction: false // 关闭webpack的箭头函数，可选
    }
  },

  resolve: {
    extensions: [".ts", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",

          // 引入postcss
          // 类似于babel，把css语法转换兼容旧版浏览器的语法
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    // 浏览器兼容插件
                    "postcss-preset-env",
                    {
                      // 每个浏览器最新两个版本
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  mode: 'development',

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // title:'TS测试'
      template: "./src/index.html"
    }),
  ]
}
