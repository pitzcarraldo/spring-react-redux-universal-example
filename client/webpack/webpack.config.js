var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: "source-map",
  context: path.resolve(__dirname, '..', '..'),
  entry: {
    client: './client/src/client/index.js',
    server: './client/src/server/index.js'
  },
  output: {
    library: 'render',
    libraryTarget: 'this',
    path: path.join(__dirname, '..', '..', 'src', 'main', 'resources', 'static', 'dist'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          "stage": 0,
          "optional": "runtime",
          "loose": "all",
          "plugins": [
            "typecheck"
          ],
          "env": {
            "development": {
              "plugins": [
                "react-transform"
              ],
              "extra": {
                "react-transform": {
                  "transforms": [{
                    "transform": "react-transform-catch-errors",
                    "imports": [
                      "react",
                      "redbox-react"
                    ]
                  }]
                }
              }
            }
          }
        }
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin("app.css"),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
};