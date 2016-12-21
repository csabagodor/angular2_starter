import * as path from 'path';
import * as webpack from 'webpack';
import {CheckerPlugin} from 'awesome-typescript-loader';
import * as validate from 'webpack-validator';

const config = {
	devtool: 'inline-source-map',
	debug: true,
	context: path.resolve(__dirname),
	entry: [
		'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
		path.resolve(__dirname, 'assets/main.browser.ts')
	],
	resolve: {
		extensions: ['.js', '.ts'],
		root: path.resolve(__dirname, 'assets'),
	},
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'public/app'),
		publicPath: '/app/',
		filename: 'bundle.js',
		hotUpdateMainFilename: 'hot/hot-update.json'
	},

	plugins: [
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
			__dirname
		),
		new CheckerPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
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
					'@angularclass/hmr-loader',
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
	}
};

export default validate(config);
