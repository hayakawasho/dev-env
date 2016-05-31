'use strict';
let webpack = require("webpack");

let webpackConfig = {
   devtool: "#source-map", // sourcemapの作成
   output: {
      filename: "[name].js",
      sourceMapFilename: 'maps/[name].map',
      //jsonpFunction: 'fr'
   },
   resolve: {
      //extensions: ['', '.js', '.jsx'], //拡張子を省略できる。対象ファイルをModuleと認識
      modulesDirectories: [
         'bower_components',
         'node_modules',
         'src'
      ]
   },
   module: {
      preLoaders: [{
         test: /\.js$/,
         exclude: /Spec\.js$/i,
         loaders: ['eslint']
      }],
      loaders: [
         //ファイルがある条件を満たしてたらloaderで変換
         //{test: /\.html$/,exclude: /node_modules/,loaders: ['html']},
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel?presets[]=es2015']
         }, {
            loader: 'babel',
            exclude: /node_modules/,
            test: /\.js[x]?$/,
            query: {
               cacheDirectory: true,
               presets: ['react', 'es2015']
            }
         }
      ]
   },
   plugins: [
      new webpack.optimize.UglifyJsPlugin({
         exclude: /Spec\.js$/i,
         compress: {
            warnings: false
         }
      }),
      //new webpack.optimize.CommonsChunkPlugin('app','app.js'),
      new webpack.optimize.AggressiveMergingPlugin(), //ファイルを細かく分析し、まとめられるところはできるだけまとめてコードを圧縮する
      new webpack.optimize.DedupePlugin(), // ライブラリ間で依存しているモジュールが重複している場合、二重に読み込まないようにする
      new webpack.optimize.OccurenceOrderPlugin(),
   ],
   eslint: {
      configFile: '.eslintrc',
      failOnError: true
   }
};

module.exports = webpackConfig;
