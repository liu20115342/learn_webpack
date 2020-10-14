const { merge } = require("webpack-merge")
const baseConfig = require("./webpack.base")
const path = require("path");
module.exports = merge(baseConfig,{
  mode:"development",
  devtool:"cheap-module-eval-source-map",
  output: {
    filename: "[name]_[hash:8].js",
    path: path.resolve(__dirname, "../dist"),
  },
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    openPage:"homepage.html",
    open:true,
    hot:true,
    hotOnly:true,
    proxy: {
      "/api": {
        target: "http://localhost:9092"
      }
    }
  }
})