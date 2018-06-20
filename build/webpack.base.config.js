const
  path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'),
  { VueLoaderPlugin } = require('vue-loader')

const
  env = require('./env'),
  isProd = process.env.NODE_ENV === 'production',
  resolve = p => path.resolve(__dirname, p)

const stylusLoader = {
  loader: 'stylus-loader',
  options: {
    preferPathResolver: 'webpack'
  }
}

const webpackConfig = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      quasar: `quasar-framework/dist/quasar.${env.theme}.esm`,

      public: resolve('../public'),
      assets: resolve('../src/assets'),
      components: resolve('../src/components'),

      variables: resolve('../src/styles/app.variables.styl'),
      'quasar-css': `quasar-framework/dist/quasar.${env.theme}.styl`,
      'quasar-core-variables': `quasar-framework/src/css/core.variables.styl`
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.styl(us)?$/,
        use: isProd
          ? ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: { minimize: true }
              },
              'postcss-loader',
              stylusLoader
            ],
            fallback: 'vue-style-loader'
          })
          : ['vue-style-loader', 'css-loader', stylusLoader]
      }
    ]
  },
  performance: {
    maxEntrypointSize: 700000,
    hints: false
  },
  plugins: isProd
    ? [
      new VueLoaderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new ExtractTextPlugin({
        filename: 'common.[chunkhash].css'
      })
    ]
    : [
      new VueLoaderPlugin(),
      new FriendlyErrorsPlugin()
    ]
}

if (!isProd) {
  webpackConfig.module.rules.unshift({
    enforce: 'pre',
    test: /\.(js|vue)$/,
    exclude: /node_modules/,
    loader: 'eslint-loader'
  })
}

module.exports = webpackConfig
