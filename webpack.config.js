const path = require("path");
const webpack = require("webpack");
const precss = require("precss");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const lost = require("lost");

module.exports = {
    entry: [
        "react-hot-loader/patch",
        "babel-polyfill",
        "whatwg-fetch",
        "webpack-dev-server/client?http://localhost:5000",
        "webpack/hot/only-dev-server",
        "./src/index",
        "material-ui"
    ],
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "app.[hash].js"
    },
    devtool: "eval",
    module: {
        noParse:[/alasql/],
        loaders: [
            {
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
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    "file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]",
                    "image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false"
                ]
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ hash: false, template: "./index.hbs" }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/),
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/,
            debug: true,
            options: {
                postcss: function() {
                    return [ lost, precss, autoprefixer ];
                },
                context: path.join(__dirname, "src"),
                output: { path: path.join(__dirname, "dist") }
            }
        })
    ]
};
