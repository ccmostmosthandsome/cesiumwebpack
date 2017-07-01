var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, './public'),
        publicPath: '/',
        sourcePrefix: "",
        //filename: "bundle.js"
        filename: '[name].min.js'
    },
    devtool: 'eval-source-map',
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        contentBase: "./public"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Weather',
            template: 'src/template/VueEntry.html',
            inject: "body"
        }),
        new webpack.ProvidePlugin({
            Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
            fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        }),
        //new webpack.optimize.CommonsChunkPlugin({ name: 'library' })
    ],
    module: {
        unknownContextRegExp: /^.\/.*$/,
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'exports-loader!babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',

            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },

            {
                test: /\.(png|gif|jpg|jpeg)$/,
                loader: "file-loader"
            },
            {
                test: /Cesium\.js$/, loader: "script-loader"
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.ttf$/, loader: "file-loader"
            },
            {
                test: /\.eot$/, loader: "file-loader"
            },
            {
                test: /\.svg$/, loader: "file-loader"
            }
        ]
    }
}