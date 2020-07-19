const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const babelConfig = require('../babel.config.json');
const { isUndefined } = require('lodash');

const buildPaths = {
    distPath: path.resolve(__dirname, '../dist'),
    buildPath: path.resolve(__dirname, '../public'),
    destinationFolder: isUndefined(process.env.NODE_ENV) ? 'dist' : 'public',
};

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/js/main.js'),
    },
    output: {
        path: isUndefined(process.env.NODE_ENV) ? buildPaths.distPath : buildPaths.buildPath,
        filename: 'js/[name].js'
    },
    optimization: {
        splitChunks: {
            minSize: 30000,
            cacheGroups: {
                vueCaches: {
                    test: /[\\/]node_modules[\\/](vue)[\\/]/,
                    name: 'vue',
                    priority: 1,
                    chunks: 'all',
                },
                lodashCaches: {
                    test: /[\\/]node_modules[\\/](lodash)[\\/]/,
                    name: 'lodash',
                    priority: 2,
                    chunks: 'all',
                },
            },
        },
        usedExports: true,
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css',
                            outputPath: 'css',
                            esModule: false,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: 'postcss.config.js',
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            // Prefer `dart-sass`
                            implementation: require('sass'),
                        },
                    },
                ],
            },
            {
                test: /\.(woff2?|ttf|otf|eot|svg)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: path.resolve(__dirname, `../${buildPaths.destinationFolder}/fonts`),
                },
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'vue-loader',
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: babelConfig.presets,
                            plugins: babelConfig.plugins,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: isUndefined(process.env.NODE_ENV) ? buildPaths.distPath : buildPaths.buildPath,
                    outputPath: isUndefined(process.env.NODE_ENV) ? buildPaths.distPath : buildPaths.buildPath,
                    esModule: false,
                },
            },
            {
                test: /\.(html)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: isUndefined(process.env.NODE_ENV) ? buildPaths.distPath : buildPaths.buildPath,
                        },
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'html-loader',
                        options: {
                            attributes: false,
                            minimize: false,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../src/img'),
                    to: path.resolve(__dirname, `../${buildPaths.destinationFolder}/img`),
                },
                {
                    from: path.resolve(__dirname, '../src/fonts'),
                    to: path.resolve(__dirname, `../${buildPaths.destinationFolder}/fonts`),
                },
                {
                    from: path.resolve(__dirname, '../src/html'),
                    to: isUndefined(process.env.NODE_ENV) ? buildPaths.distPath : buildPaths.buildPath,
                },
            ]
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new VueLoaderPlugin(),
    ],
};
