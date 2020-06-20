const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const babelConfig = require('./babel.config.json');

module.exports = (env) => {
    return {
        mode: env.production ? 'production' : 'development',
        entry: {
            main: path.resolve(__dirname, 'src/js/main.js'),
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[name].js'
        },
        optimization: {
            splitChunks: {
                chunks: 'async',
                minSize: 30000,
            },
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000
        },
        devtool: env.production ? 'source-map' : 'eval-source-map',
        watch: !env.production,
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: path.resolve(__dirname, `dist/css/`),
                            },
                        },
                        {
                            loader: 'css-loader', options: {
                                sourceMap: !env.production,
                                modules: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: !env.production,
                                config: {
                                    path: 'postcss.config.js',
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: !env.production,
                            },
                        },
                    ],
                },
                {
                    test: /\.vue$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'vue-loader',
                        },
                        {
                            loader: 'babel',
                            options: {
                                presets: babelConfig.presets,
                                plugins: babelConfig.plugins,
                            }
                        }
                    ],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    // include: [path.join(__dirname, 'src/js/main.js')],
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
                        publicPath: path.resolve(__dirname, 'dist/img'),
                    },
                },
                {
                    test: /\.(html)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                publicPath: path.resolve(__dirname, 'dist'),
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
                // this isn't technically needed, since the default `vue` entry for bundlers
                // is a simple `export * from '@vue/runtime-dom`. However having this
                // extra re-export somehow causes webpack to always invalidate the module
                // on the first HMR update and causes the page to reload.
                // 'vue': '@vue/runtime-dom'
                // For my current version of Vue
                'vue': 'vue/dist/vue.esm-bundler.js'
            }
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'src/img'),
                        to: path.resolve(__dirname, 'dist/img'),
                    },
                    {
                        from: path.resolve(__dirname, 'src/fonts'),
                        to: path.resolve(__dirname, 'dist/fonts'),
                    },
                    {
                        from: path.resolve(__dirname, 'src/html'),
                        to: path.resolve(__dirname, 'dist'),
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
};
