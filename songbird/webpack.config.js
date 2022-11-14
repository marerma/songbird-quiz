const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimizer = [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
const pages = ['index', 'quiz'];

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader
    },
    'css-loader'
  ]

  if (extra) {
    loaders.push(extra)
  }

  return loaders
}

const babelOptions = preset => {
  const opts = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  }

  if (preset) {
    opts.presets.push(preset)
  }

  return opts
}


const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }]

  return loaders
}

const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      favicon: './src/assets/favicon.ico',
      template: './src/index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
    //new FaviconsWebpackPlugin('./src/favicon.ico'),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets", to: "assets" ,
          noErrorOnMissing: true
        }]
    }
     )
  ]





  if (isProd) {
    base.push(new BundleAnalyzerPlugin())
  }

  return base
}

const pluginsNew = [].concat(
    pages.map(
      (page) =>
        new HTMLWebpackPlugin({
          inject: true,
          template: `./src/${page}.html`,
          filename: `${page}.html`,
          chunks: [page],
        })
    ),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
    //new FaviconsWebpackPlugin('./src/favicon.ico'),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets", to: "assets" ,
          noErrorOnMissing: true
        }]
    })
)


module.exports = {
  mode: 'development',
  // entry: {
  //   main: ['@babel/polyfill', './src/index.js'],
  // },
  // output: {
  //   filename: filename('js'),
  //   path: path.resolve(__dirname, 'dist'),
  //   assetModuleFilename: 'assets/[hash][ext]',
  // },
  entry: pages.reduce((config, page) => {
    config[page] = `./src/${page}.js`;
    return config;
  }, {}),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev
  },
  devtool: isDev ? 'source-map' : false,
  plugins: pluginsNew,//plugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
        {
      test: /\.(png|jpg|svg|gif)$/i,
      //use: ['file-loader'],
      type: 'asset/resource',
    },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        //use: ['file-loader'],
        type: 'asset/resource',
      },
      {
        test: /\.mp3$/,
        type: 'asset/resource',
        // type: "assets",
        // generator: {
        //   filename: 'audio/[name][ext]'
        // }
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.csv$/,
        use: ['csv-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      }
    ]
  }
}