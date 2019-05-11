import path from 'path';

import webpack from 'webpack';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const rootPath = path.resolve(__dirname, '.');
const srcPath = path.resolve(rootPath, 'src');
const distPath = path.resolve(rootPath, 'dist');
const dataPath = path.resolve(rootPath, 'data');
const dllPath = path.resolve(distPath, 'assets/dll');

import config from '../config.json';

const env = process.env.NODE_ENV === 'dev' ? 'development' : 'production';

const webpackConfig: webpack.Configuration = {
	'entry': path.resolve(srcPath, 'index.tsx'),
	'output': {
		'path': distPath,
		'filename': 'main.js',
		'publicPath': '/',
		'pathinfo': false,
	},
	'devtool': false,
	'module': {
		'rules': [
			{
				'test': /\.tsx?$/,
				'include': srcPath,
				'use': [
					{
						'loader': 'ts-loader',
						'options': {
							'transpileOnly': true,
							'experimentalWatchApi': true,
						},
					},
				],
			},
			{
				'test': /\.s?css$/,
				'include': srcPath,
				'use': [
					MiniCssExtractPlugin.loader,
					{
						'loader': 'css-loader',
					},
					{
						'loader': 'sass-loader',
					},
				],
			},
			{
				'test': /\.(png|jpe?g|svg)$/,
				'include': srcPath,
				'use': {
					'loader': 'url-loader',
					'options': {
						'limit': 8192,
					},
				},
			},
			{
				'test': /\.txt$/,
				'include': srcPath,
				'use': {
					'loader': 'file-loader',
				},
			},
			{
				'test': /\.(ttf|eot|woff2?)$/,
				'include': srcPath,
				'use': {
					'loader': 'file-loader',
					'options': {
						'name': 'fonts/[name].[ext]',
					},
				},
			},
		],
	},
	'resolve': {
		'extensions': [
			'.ts',
			'.tsx',
			'.js',
			'.json',
		],
		'alias': {
			'~': srcPath,
		},
	},
	'plugins': [
		new webpack.DefinePlugin({
			'__dev': process.env.NODE_ENV === 'development',
			'__test': process.env.NODE_ENV === 'test',
			'__path': JSON.stringify({
				'root': rootPath,
				'src': srcPath,
				'dist': distPath,
				'data': dataPath,
			}),
			'__config': JSON.stringify(config),
		}),
		new webpack.ProgressPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			'filename': 'styles.css',
		}),
		new HtmlWebpackPlugin({
			'template': path.resolve(srcPath, 'index.html'),
		}),
	],
	'mode': env,
	'optimization': {
		'minimize': false,
		'removeAvailableModules': false,
		'removeEmptyChunks': false,
		'splitChunks': false,
	},
	'devServer': {
		'contentBase': distPath,
		'watchContentBase': true,
		'host': 'localhost',
		'port': config.port + 1,
		'hot': true,
		'proxy': [
			{
				'context': [
					'/api',
				],
				'target': `http://localhost:${config.port}`,
			},
		],
	},
};

export default webpackConfig;
