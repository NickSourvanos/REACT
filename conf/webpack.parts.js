const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const PurifyCSSPlugin = require("purifycss-webpack")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const GitRevisionPlugin = require("git-revision-webpack-plugin")
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin")
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin")

exports.deleteDuplicatePackages = () => {
  plugins: [new DuplicatePackageCheckerPlugin({
    verbose: true,
  })]
}

exports.minifyJavaScript = () => ({
  optimization: {
    minimizer: [new UglifyWebpackPlugin({sourceMap: true})],
  },
})

exports.loadSass = () => ({
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        {loader: "style-loader"}, 
        {loader: "css-loader"}, 
        {loader: "sass-loader"}]    
    }]
  }
})

exports.loadFonts = () => ({
  module: {
    rules: [{
      test: /\.(ttf|eot|woff|woff2|svg)$/,
      loader: "file-loader",
      options: {
        name: "fonts/[name].[ext]",
      },
    }]
  }
})

exports.clean = path => ({
  plugins: [new CleanWebpackPlugin([path], { root: process.cwd() })],
})

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
   
    rules: [
      {
        test: /\.(png|jpg)$/,
        include,
        exclude,
        use: {
          loader: "url-loader",
          options,
        },
      },
    ],
  },
})

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
})

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })],
})

exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")()],
  },
})

exports.devServer = (host='localhost', port=8080) => ({
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
    devServer: {
      // hot: true,
      inline: false,
      stats: "errors-only",
      host,                   // Defaults to `localhost`
      port,                   // Defaults to 8080
      open: true,
      watchOptions: {
        aggregateTimeout: 300, // Delay the rebuild after the first change
        poll: 100,            // Poll using interval (in ms, accepts boolean too)
      },
      headers: { "Access-Control-Allow-Origin": "*"},
      historyApiFallback: true,
      contentBase: '../dist'
    },
})

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
})

exports.extractCSS = ({ include, exclude, use }) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    // `allChunks` is needed to extract from extracted chunks as well.
    allChunks: true,
    filename: "[name].[md5:contenthash:hex:20].css",
  })

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,

          use: plugin.extract({
            use,
            fallback: "style-loader",
          }),
        },
      ],
    },
    plugins: [plugin],
  }
}