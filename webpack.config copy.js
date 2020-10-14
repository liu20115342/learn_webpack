const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin=require("mini-css-extract-plugin")
const pageConfig = {
  homepage: "./src/js/homepage.js",
  list: "./src/js/list.js",
};

module.exports = {
  entry: pageConfig,
  mode:"development",
  output: {
    filename: "[name]_[hash:8].js",
    path: path.resolve(__dirname, "./dist"),
  },
  devtool:"cheap-module-eval-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    openPage:"homepage.html",
    open:true,
    hot:true,
    hotOnly:true,
    proxy: {
      "/api": {
        target: "http://localhost:9092"
      }
    }
  }, 
  resolve:{
    alias:{
      '@':path.resolve(__dirname,"./src") //别名，在编码中 使用@代替快速定位src
    },
    extensions:['.js'], //扩展名省略配置
    modules: ["node_modules"], //指定第三方库查询路径 否则会向上查询
  },
  
  externals: {
    //jquery通过script引⼊入之后，全局中即有了 jQuery 变量 配置之后可以使用import的方式引入jquery 同时 在打包时不会打包jquery
    'jquery': 'jQuery'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/, // \:转移字符 .:特殊字符 \. 表示.
        include: path.resolve(__dirname, "./src"),
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test:/\.js$/,
        include: path.resolve(__dirname, "./src"),
        loader:"babel-loader"
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        include: path.resolve(__dirname, "./src"),
        use: {
          loader:"file-loader",
          options:{
            name: "[name]_[contenthash:8].[ext]",
            outputPath:"font/"//生成后存放的路径
          }
        }
      },
      {
        test:/\.(png|jpe?g|gif)$/,
        include: path.resolve(__dirname, "./src"),
        use: {
          loader:"url-loader",
          options: {
            name: "[name]_[contenthash:8].[ext]",
            outputPath: "images/",//生成后存放的路径
            //1024为1kb 小于10000(8kb)，才转换成base64 
            limit: 10000
          }
        }
        
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name][contenthash:8].css",
    }),
    new HtmlWebpackPlugin({
      filename: "homepage.html",
      template: path.resolve(__dirname, "./src/html/homepage.html"),
      chunks: ["homepage"],
    }),
    new HtmlWebpackPlugin({
      filename: "list.html",
      template: path.resolve(__dirname, "./src/html/list.html"),
      chunks: ["list"],
    }),
  ],
};
