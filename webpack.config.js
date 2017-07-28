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
    node: {
        fs: 'empty'
    },
    externals: [
        {
            './cptable': 'var cptable',

        },
        {
            './jszip' : 'jszip'
        }
    ],
    devtool: 'eval-source-map',
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        contentBase: "./public",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            '/services': {
                target: 'http://localhost:3335',
                changeOrigin: true,
                secure: false,
                cookieDomainRewrite: '',
                onProxyReq: function (request, req, res) {
                    request.setHeader('origin', 'http://localhost:3335')
                }
            }
        }
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
                options: {
                    loaders: {
                         scss: 'vue-style-loader!css-loader!sass-loader'
                    }
                }

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