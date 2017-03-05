const webpack = require('webpack');

module.exports = {
  entry: './js/index.js',
  output: {
    path: './dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.jsx$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.scss$/,
      loader: "style-loader!css-loader!sass-loader"
    }
  ]
  }
};
