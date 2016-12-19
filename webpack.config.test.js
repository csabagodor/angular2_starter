const path = require('path');
const webpack = require('webpack');

module.exports = {
	debug: true,
	verbose: true,
	devtool: 'inline-source-map',
	module: {
		preLoaders: [
			{exclude: /node_modules/, loader: 'tslint', test: /\.ts$/}
		],
		loaders: [
			{loader: 'raw', test: /\.(css|html)$/},
			{exclude: /node_modules/, loaders: [
				'ts-loader',
				'angular2-template-loader',
				'angular2-router-loader'
			], test: /\.ts$/},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loaders: ['raw-loader', 'sass-loader']
			},
			{
				test: /\.(pug|jade)$/,
				loaders: ['pug-ng-html']
			},
		],
		noParse: [
			path.join('node_modules', 'angular2', 'bundles')
		]
	},
	resolve: {
		extensions: ['', '.js', '.ts'],
		root: path.resolve('.', path.resolve(__dirname, 'assets'))
	},
	tslint: {
		emitErrors: true
	}
};
