/* eslint-env node */
import path from 'path'


export default {
  mode: 'production',
  entry: './src/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            minified: true,
            comments: false,
            compact: true,
            sourceMaps: false,
            inputSourceMap: false,
            cacheDirectory: false,
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
    filename: 'main.prod.cjs',
    path: path.resolve('build/prod'),
    clean: true // clean the output directory before emit
  }
}
