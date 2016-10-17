const path = require('path');
const libPath = path.join(__dirname, 'src');
const wwwPath = path.join(__dirname, 'build');
const pkg = require('./package.json');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['includes.js', path.join(libPath, 'ts/index.ts')],
  context: libPath,
  output: {
    path: wwwPath,
    filename: 'app-[hash:6].js',
  },
  devServer:{
    contentBase: libPath,
    host: '0.0.0.0'
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: [
        'babel-loader',
        'ts-loader',
      ]
    },{
      test: /\.html$/,
      loader: 'html',
    }, {
      test: /\.json$/,
      loader: 'json',
    }, {
      test: /\.(png|jpg)$/,
      loader: 'file?name=img/[name].[ext]',
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader',
    }, {
      test: /\.scss$/,
      loader: 'style!css!autoprefixer!sass',
    }, {
      test: /\.js$/,
      exclude: /(node_modules|vendor|src\/lib)/,
      loaders: ['babel-loader'],
    },
  ],
  },
  resolve: {
    extensions: ['.js', '.json', '.scss', '.html', '.ts'],
    /*root: [
      libPath,
      path.join(__dirname, 'node_modules'),
    ],*/
    modules: [
      libPath,
      'node_modules'
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      COMPILE_ENV: process.env.COMPILE_ENV,
      pkg,
      hash: Math.random().toString(36).substring(4),
      template: path.join(libPath, 'index.ejs'),
    }),
//    new webpack.optimize.UglifyJsPlugin(),
  ],
};
