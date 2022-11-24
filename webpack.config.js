const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  resolve: {
    modules: [path.join(__dirname), 'node_modules'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  entry: path.join(__dirname, 'src', 'client', 'index.tsx'),
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //   },
      // },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: 'style-loader',
      //     },
      //     {
      //       loader: 'css-loader',
      //     },
      //   ],
      // },
    ],
  },
  optimization: {
    minimize: false
},
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, 'src', 'client', 'index.html'),
    }),
  ],
};
