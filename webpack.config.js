'strict mode'

var webpack = require('webpack'),
		ExtractTextPlugin = require('extract-text-webpack-plugin'),
		CleanWebpackPlugin = require('clean-webpack-plugin'),
		LiveReloadPlugin = require('webpack-livereload-plugin'),
		WebpackBuildNotifierPlugin = require('webpack-build-notifier'),
		autoprefixer = require('autoprefixer'),
		path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
	context: path.resolve(__dirname, './src/'),
	entry: {
		app: './index.js'
	},
	output: {
		path: path.resolve(__dirname, './public/build/'),
		filename: '[name].js',
		publicPath: '/assets/'
	},
	resolve: {
		root: [path.resolve(__dirname, './src/')],
		extensions: ['', '.js', '.styl']
	},
	module: {
		loaders: [
			{test: /\.json$/,loader: 'json'},
			{test: /(\.css|-css)$/, loader: ExtractTextPlugin.extract('style', 'css!postcss')},
			{test: /\.styl$/, loader: ExtractTextPlugin.extract('css!csslint?configFile=./configs/csslint!postcss!stylus?resolve url')},
			{test: /\.js$/, exclude: path.join(__dirname, 'node_modules'), loader: 'babel'}
		],
		postLoaders: [
			{
				include: path.resolve(__dirname, 'node_modules/pixi.js'),
				loader: 'transform?brfs'
			}
		],
		noParse: [
			/.*(pixi\.js).*/,
			/.*(p2).*/
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),
		new ExtractTextPlugin('style.css'),
		new webpack.NoErrorsPlugin(),
		new WebpackBuildNotifierPlugin()
	],
	devtool: NODE_ENV === 'development' ? 'source-map' : null
}