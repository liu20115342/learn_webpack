const { merge } = require("webpack-merge")
const baseConfig = require("./webpack.base")
const path = require("path");
module.exports = merge(baseConfig,{
  mode:"production",
  output: {
    filename: "[name]_[contenthash:8].js",
    path: path.resolve(__dirname, "../prod"),
  },
})