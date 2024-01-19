const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
	mode: "development",
	entry: {
		bundle: path.resolve(__dirname, "src/js/app.js"),
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "js/[name][contenthash].js",
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					"sass-loader",
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Browser-sync Webpack Template",
			filename: "index.html",
			template: "src/static/index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name][contenthash].css",
		}),
		new CleanWebpackPlugin(),
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: {baseDir: ['dist']}
		}),
	],
};
