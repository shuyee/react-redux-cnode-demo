const webpack = require('webpack')
const path = require('path')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:8888' })
  ],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				options: {
					presets: ['react', 'es2015']
				},
				exclude: /node_modules/
			},
			{
				test: /\.styl?$/,
				loader: 'style-loader!css-loader!stylus-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
			},
			{
				test: /\.css?$/,
				loader: 'css-loader'
			},
			{
		    test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
		    loader: 'file-loader'
			}
		]
	}
}