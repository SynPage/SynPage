const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    popup: './src/chrome/popup.tsx',
    background: './src/chrome/background.ts',
    content: './src/chrome/content.tsx'
  },
  output: {
    path: path.join(__dirname, "build"),
    // filename: '[name].[contenthash].bundle.js',
    filename: '[name].js',
    clean: true
  },
  // mode: process.env.NODE_ENV || "development",
  mode: "production",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: { contentBase: path.join(__dirname, "src") },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      chunks: ["popup"]
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: ["**/index.html"],
          }
        },
      ],
    }),
    new MiniCssExtractPlugin(),
    new Dotenv({
      path: ".env"
    })
  ],
};