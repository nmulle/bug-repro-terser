/* eslint-env node */
import path from 'path'


export default {
  mode: 'development',
  entry: './src/index.ts',
  target: 'node',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: 'upward' // find babel.config file in top-level project root
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  output: {
    libraryTarget: 'commonjs2',
    filename: 'main.dev.cjs',
    path: path.resolve('build/dev'),
    clean: true // clean the output directory before emit
  }
}
