var webpack = require("webpack");

var webpackConfig = {
   devtool: "#source-map", // sourcemapの作成
   output: {
      filename: "[name].js",
      sourceMapFilename: 'maps/[name].map',
      //jsonpFunction: 'fr'
   },
   resolve: {
      //extensions: ['', '.js', '.coffee'], //拡張子を省略できる
      modulesDirectories: [
         'bower_components',
         'node_modules',
         'src'
      ],
      alias: {}
   },
   module: {
      preLoaders: [{
         test: /\.js$/,
         exclude: /Spec\.js$/i,
         loaders: ['eslint']
      }],
      loaders: [{
         test: /\.(js)$/,
         exclude: /node_modules/,
         loader: 'babel?presets[]=es2015'
      }]
   },
   plugins: [
      new webpack.optimize.UglifyJsPlugin({
         exclude: /Spec\.js$/i,
         compress: {
            warnings: false
         }
      }),
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
