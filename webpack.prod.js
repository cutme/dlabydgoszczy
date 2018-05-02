const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

module.exports = merge(common, {
    module: {
    	rules: [
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: 'happypack/loader?id=sass'
                }),
                enforce: "pre"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        createHappyPlugin('sass', ['css-loader?importLoaders:1!postcss-loader!sass-loader']),

        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                drop_console: false
            },
            minimize: true,
            sourceMap: true,
		}),
		/*
new PurifyCSSPlugin({
    		paths: glob.sync(path.join(__dirname, './src/*.html'))
		})
*/
	]
});

function createHappyPlugin(id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    verbose: false,
  });
}