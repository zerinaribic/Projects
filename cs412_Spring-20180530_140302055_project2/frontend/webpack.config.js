var webpack = require('webpack')
var path = require('path')

module.exports = {
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, 'initialApp'),
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /(\.css)$/, loaders: ['style-loader', 'css-loader']}
    ]
  }
}
