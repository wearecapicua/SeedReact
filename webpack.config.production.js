var path = require('path');
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var lost = require('lost');

module.exports = env => {
  return {
    entry: {
        vendor: ['react', 'react-dom', 'react-router'],
        app: [
            'babel-polyfill',
            './src/index'
        ],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'assets/[name].[hash].js',
        chunkFilename: 'assets/[name].[chunkhash].js'
    },
    devtool: 'cheap-module-source-map',
    module: {
        noParse:[/alasql/],
        loaders: [            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: [
                        [ "es2015", { modules: false } ],
                        "stage-0",
                        "react"
                    ],
                    plugins: [
                        "transform-async-to-generator",
                        "transform-decorators-legacy"
                    ]
                }
            },
        {
            test: /\.scss$/,
            loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader!postcss-loader'
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },
        {
            test  : /\.less$/,
            loader: "style-loader!css-loader!less-loader"
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                "file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]",
                "image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false"
            ]
        },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': env
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/,
            debug: true,
            options:  {
                postcss: function() {
                    return [precss, autoprefixer, lost];
                },
                context: path.join(__dirname, 'src'),
                output: {
                    path: path.join(__dirname, 'dist')
                }
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin("assets/styles.css"),
        new HtmlWebpackPlugin({
            hash: false,
            template: './index.hbs'
        })
    ],
}
};
