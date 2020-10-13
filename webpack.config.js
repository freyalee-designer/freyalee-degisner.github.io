const path = require("path");
const webpack = require("webpack");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const MangleJsClassPlugin = require("mangle-js-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// const Jscrambler = require("jscrambler-webpack-plugin");
if (process.env.NODE_ENV === "production") {
  Vue.config.devtools = false;
  Vue.config.debug = false;
  Vue.config.silent = true;
  Vue.config.productionTip = false;
}

module.exports = {
  context: path.resolve(__dirname, "Content/"),
  entry: {
    "js/index": "./webpack/index.js",
  },
  // watch: true,
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
  },
  module: {
    rules: [
      // {
      //     test: /\.(html|htm)$/i,
      //     loader: 'html-withimg-loader'
      // },
      {
        test: /\.(gif|png|jpg|ttf)$/,
        use: [
          {
            loader: "url-loader",
            // options: {
            //   limit: 5 * 2,
            //   outputPath: "/Content/img/",
            //   esModule: false,
            //   name: "[name].[ext]",
            // },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "./css/",
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "./css/style.css",
    }),
  ],
  output: {
    path: path.resolve(__dirname, "content/"),
    // publicPath: "/script",
    // filename: "./js/main.js",
    filename: "./[name].js",
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: path.resolve(__dirname),
    // historyApiFallback: true,
    // inline: true
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        sourceMap: false,
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
};
