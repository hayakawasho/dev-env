'use strict';
let webpack = require("webpack");
let webpackConfig = {
	output: {
		filename: "[name].bundle.js",
		sourceMapFilename: 'maps/[name].bundle.map',
	},
	devtool: '#source-map',
	resolve: {
		extensions: ['', '.js', '.jsx', '.coffee', '.ts'],
		// 探索するモジュール用ディレクトリを指定
		modulesDirectories: ['node_modules']
	},
	module: {
		preLoaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loaders: ['eslint']
		}],
		loaders: [{
			test: /\.js[x]?$/,
			exclude: /node_modules/,
			loaders: ['babel']
		}, {
			test: /\.coffee$/,
			loader: 'coffee-loader'
		}, {
			test: /\.ts(x?)$/,
			loader: 'ts-loader'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=8192'
		}, {
			test: /\.css$/,
			loaders: ["style-loader", "css-loader"]
		}],
	},
	plugins: [
		// new webpack.optimize.CommonsChunkPlugin('common.bundle.js'),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		// 指定のモジュールを予めグローバル変数としておく
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		})
	],
	eslint: {
		configFile: '.eslintrc',
		failOnError: true
	}
};
if(process.env.NODE_ENV === "production") {
	delete webpackConfig.devtool;
	webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}));
}
module.exports = webpackConfig;
