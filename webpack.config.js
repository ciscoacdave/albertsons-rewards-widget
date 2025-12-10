const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/albertsons-rewards-widget.js',
  output: {
    filename: 'albertsons-rewards-widget.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    static: './dist',
    port: 3000,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*' // Required for WXCC to load the script
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};