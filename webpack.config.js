var path = require('path')
var merge = require('webpack-merge')

var TARGET = process.env.npm_lifecycle_event

var config = {
	entry: {
		background: path.join(__dirname, 'src', 'background'),
		content: path.join(__dirname, 'src', 'content'),
		popup: path.join(__dirname, 'src', 'popup'),
	},
	output: {
		filename: '[name].bundle.js',
		path: path.join(__dirname, 'lib'),
	},
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
						},
					},
				],
			},
			{
				exclude: /node_modules/,
				test: /\.js$/,
				use: 'eslint-loader',
				enforce: 'pre',
			},
			{
				exclude: /node_modules/,
				test: /\.js$/,
				use: 'babel-loader',
			},
		],
	},
	resolve: {
		extensions: [
			'.css',
			'.js',
			'.json',
		],
		modules: [
			'node_modules',
			'src',
		],
	},
}

switch (TARGET) {
	case 'build':
		module.exports = merge(
			config,
			{
			}
		)

	case 'start':
	default:
		module.exports = merge(
			config,
			{
				devServer: {
					contentBase: path.join(__dirname, 'lib'),
					compress: true,
					hot: true,
					port: 8000,
				},
			}
		)
}
