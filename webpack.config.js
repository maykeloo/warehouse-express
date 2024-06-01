const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: './server.ts', // Wskaz na główny plik Twojej aplikacji
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, './tsconfig.json')
      })
    ],
  },
  output: {
    filename: 'bundle.js', // Nazwa wyjściowego pliku
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node', // Konfiguracja dla aplikacji Node.js
};