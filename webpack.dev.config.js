const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const copyPath = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              },

            }
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      '@context': path.resolve('src/context'),
      '@components': path.resolve('src/components'),
      '@assets': path.resolve('src/assets'),
    }
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new copyPath({
      patterns:[
        {
          from:'src/assets',
          to:'assets'
        }
      ]
    })
  ],
};