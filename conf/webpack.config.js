const path = require("path")
const glob = require("glob")
const merge = require("webpack-merge")

const WatchIgnorePlugin = require('watch-ignore-webpack-plugin')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const parts = require("./webpack.parts")

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css"
})

const PORT = require('./').PORT
const HOST = require('./').HOST
const PATH_SRC = require('./').PATH_SRC
const PATH_BUILD = require('./').PATH_BUILD
const ENTRY_FILE = require('./').ENTRY_FILE
const ENTRY_HTML_FILE = require('./').ENTRY_HTML_FILE

const commonConfig = merge([
  
  {
    entry: ENTRY_FILE,

    module: {

      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },    
      ]

    },

    plugins: [
      new HtmlWebPackPlugin({
        template: ENTRY_HTML_FILE,      //where to take html file in src folder
        filename: "./index.html"        //where to place new html file in dist folder
      }),
      new WatchIgnorePlugin([
        path.join(__dirname, "node_modules"),
        PATH_BUILD
      ]),
    ]
  },
])

const productionConfig = merge([

  parts.deleteDuplicatePackages(),

  {
    performance: {
      hints: "warning", // "error" or false are valid too
      maxEntrypointSize: 50000, // in bytes, default 250k
      maxAssetSize: 450000, // in bytes
    },
  },

  {
    output: {
      chunkFilename: "[name].[chunkhash:4].js",
      filename: "[name].[chunkhash:4].js",
      path: path.resolve(PATH_BUILD)
    },
  },

  parts.clean(PATH_BUILD),

  parts.minifyJavaScript(),

  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "initial",
          },
        },
      },
    },
  },

  parts.generateSourceMaps({ type: "source-map" }),

  parts.extractCSS({
    use: ["css-loader", parts.autoprefix()],
  }),

  // parts.purifyCSS({
  //   paths: glob.sync(`${PATH_SRC}/**/*.js`, { nodir: true }),
  // }),
  
  parts.loadImages({
    options: {
      limit: 15000,
      name: "[name].[hash:4].[ext]",
    },
  }),

  parts.loadSass({
    plugins: [extractSass]
  }),

  parts.loadFonts()

])

const developmentConfig = merge([

  parts.devServer(HOST, PORT),

  parts.loadCSS(),

  parts.loadImages(),

  parts.loadSass(),

  parts.loadFonts()

])

module.exports = mode => (
  mode === "production"
  ? merge(commonConfig, productionConfig, { mode }) 
  : merge(commonConfig, developmentConfig, { mode })
)
