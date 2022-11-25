const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

module.exports = {
    mode: "development",
    entry: './src/index.ts',
    output: {
        filename: isProd ? "bundle.[hash].js" : "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            "fs": false
        },
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 3000,
        hot: isDev,
    },
    plugins: [
        new NodePolyfillPlugin(),
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/index.html",
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            },
            inject: 'body'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, 'pug-runtime/pug.js'),
                    to: path.resolve(__dirname, 'dist')
                },{
                    from: path.resolve(__dirname, 'pug-runtime/pug-init.js'),
                    to: path.resolve(__dirname, 'dist')
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: isProd ? 'bundle.[hash].css' : 'bundle.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|woff2|woff)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,

                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            // {
            //     test: /\.m?js$/,
            //     exclude: /(node_modules|bower_components|pug-runtime)/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/preset-env']
            //         }
            //     }
            // },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /(node_modules|pug-runtime)/,
            },
        ],
    },

}