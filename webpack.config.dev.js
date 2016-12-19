import * as path from 'path';
import * as webpack from 'webpack';
import {CheckerPlugin} from 'awesome-typescript-loader';
import * as validate from 'webpack-validator';
import {TsConfigPathsPlugin} from 'awesome-typescript-loader';

const config = {
	devtool: 'inline-source-map',
	entry: [
		path.resolve(__dirname, 'assets/main.ts')
	],
	resolve: {
		extensions: ['.js', '.ts'],
		root: path.resolve(__dirname, 'assets'),
	},
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'public/app/'),
		publicPath: '/app/',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
			__dirname
		),
		new CheckerPlugin(),
		new TsConfigPathsPlugin({
			useCache: false
		})
	],
	module: {
		loaders: [
			{
				test: /\.(pug|jade)$/,
				loaders: ['pug-ng-html']
			},
			{
				test: /\.ts$/,
				loaders: [
					'awesome-typescript-loader',
					'angular2-template-loader',
					'angular2-router-loader'
				],
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				loader: 'html'
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loaders: ['raw-loader', 'sass-loader']
			}
		]
	},
};

export default validate(config);
