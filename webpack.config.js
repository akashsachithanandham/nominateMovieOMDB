const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
module.exports={
entry:'./src/index.js',
output:{
    path:path.resolve(__dirname,"dist"),
    filename:'index_bundle.js'
},
module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: "file-loader",
      },
    ],
  },
  mode:'development',
  plugins: [
    new Dotenv(),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
      filename: "index.html",
    }),
  ],
}