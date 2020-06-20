const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const babelConfig = require('./babel.config.json');

module.exports = (env) => {
    return {
        mode: env.production ? 'production' : 'development',
        entry: {
            main: path.resolve(__dirname, 'src/js/main.js'),
        },
        output: {
            path: path.resolve(__dirname),
            filename: 'js/[name].js'
        },
        optimization: {
            splitChunks: {
                chunks: 'async',
                minSize: 30000,
            },
        },
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
                                publicPath: path.resolve(__dirname, `css/`),
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
            ],
        },
        plugins: [
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
