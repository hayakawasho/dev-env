'use strict';
let webpack = require("webpack");
let webpackConfig = {
	output: {
		filename: "[name].bundle.js",
		sourceMapFilename: 'maps/[name].bundle.map',
	},
	devtool: '#source-map',
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modulesDirectories: ['node_modules', 'src']
	},
	module: {
		preLoaders: [{
			test: /\.js$/,
			exclude: /Spec\.js$/i,
			loaders: ['eslint']
		}],
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loaders: ['babel']
		}, {
			test: /\.css$/,
			loader: "style!css"
		}, {
			test: /\.(jpg|png)$/,
			loaders: ['url-loader']
		}],
	},
	plugins: [
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.ProvidePlugin({
			jQuery: "jquery",
			$: "jquery",
			jquery: "jquery"
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
		exclude: /Spec\.js$/i,
		compress: {
			warnings: false
		}
	}));
}
module.exports = webpackConfig;
