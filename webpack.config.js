var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var stripLogs = 'strip-loader?strip[]=console.error' +
                            '&strip[]=console.log' +
                            '&strip[]=console.warn'


module.exports = {
  // The base directory for resolving the entry option
  context: __dirname,

  entry: {
    app: 'index',
    vendor: ['babel-polyfill'],
  },

  output: {
    path: path.join(__dirname, 'dist/assets'),
    filename: 'vanilla-spike.js',
    pathinfo: true
  },
  /*
  output: {
          path: path.join(__dirname, 'dist/assets'),
          filename: '[chunkhash].js',
          chunkFilename: '[chunkhash].js'
      },
   */

  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')],
    moduleExtensions: ['-loader'],
  },

  resolve: {
    // Directories that contain our modules
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    descriptionFiles: ['package.json'],
    moduleExtensions: ['-loader'],
    // Extensions used to resolve modules
    extensions: ['.js', '.scss', '.css']
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            'css?minifier',
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            'css?minifier',
            'group-css-media-queries',
            'sass'
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|html)$/,
        use: ['file']
      },
      {
        test: /\.js$/,
        use: ['babel', stripLogs],
        exclude: [/node_modules/]
      },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({names: ['vendor'],
                                             filename: 'vendor.js'}),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ExtractTextPlugin('vanilla-spike.css'),
    new HtmlWebpackPlugin({
      title: 'vanilla-spike',
      filename: '../index.html',
      template: 'index.ejs'
    })
  ],

  // Include mocks for when node.js specific modules may be required
  node: {
    fs: 'empty',
    vm: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
