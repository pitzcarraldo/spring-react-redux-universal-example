var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = {
	output: {
		library: 'server',
		path: path.join(__dirname, 'dist'),
		filename: 'server.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.NoErrorsPlugin()
	]
};

var isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {

	webpackConfig = Object.assign(webpackConfig, {
		devtool: "source-map",
		entry: [
			//'./src/client/index.js',
			'./src/server/server.nashorn.js'
		],
		module: {
			loaders: [{
				test: /\.(js)$/,
				loader: 'babel',
				exclude: /node_modules/,
				include: __dirname,
				query: {
					"stage": 0,
					"optional": "runtime",
					"loose": "all",
					"plugins": [
						"typecheck"
					],
					"env": {
						"development": {
							"plugins": [
								"react-transform"
							],
							"extra": {
								"react-transform": {
									"transforms": [{
										"transform": "react-transform-catch-errors",
										"imports": [
											"react",
											"redbox-react"
										]
									}]
								}
							}
						}
					}
				}
			},
				{test: /\.json$/, loader: 'json-loader'},
				{test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192'},
				{test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')}
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production')
				}
			}),
			new ExtractTextPlugin("app.css"),
			new webpack.optimize.UglifyJsPlugin({minimize: true})
		]
	});

} else {

	webpackConfig = Object.assign(webpackConfig, {
		devtool: 'inline-source-map',
		entry: [
			'webpack-hot-middleware/client',
			'./src/client/index.js'
		],
		module: {
			loaders: [{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				include: __dirname,
				query: {
					optional: ['runtime'],
					stage: 2,
					env: {
						development: {
							plugins: [
								'react-transform'
							],
							extra: {
								'react-transform': {
									transforms: [{
										transform: 'react-transform-hmr',
										imports: ['react'],
										locals: ['module']
									}]
								}
							}
						}
					}
				}
			},
				{test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192'},
				{test: /\.css$/, loader: 'style-loader!css-loader'}
			]
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	});

}

module.exports = webpackConfig;