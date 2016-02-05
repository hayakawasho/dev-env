var webpack = require("webpack");

var webpackConfig = {
   devtool: "#source-map", // sourcemapの作成
   output: {
      filename: "[name].js",
      sourceMapFilename: 'maps/[name].map',
      //jsonpFunction: 'fr'
   },
   resolve: {
      extensions: ['', '.js', '.coffee'], //拡張子を省略できる
      modulesDirectories: [
         //'bower_components',
         'node_modules',
      ],
      alias: {}
   },
   module: {
      loaders: [{
         test: /\.(js)$/,
         exclude: /node_modules/,
         loader: 'babel?presets[]=es2015'
      }]
   },
   plugins: [
      //new webpack.optimize.UglifyJsPlugin({}),
      new webpack.optimize.AggressiveMergingPlugin(), //ファイルを細かく分析し、まとめられるところはできるだけまとめてコードを圧縮する
      new webpack.optimize.DedupePlugin(), // ライブラリ間で依存しているモジュールが重複している場合、二重に読み込まないようにする
   ]
};

module.exports = webpackConfig;
