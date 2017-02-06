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
			}
		)
}
