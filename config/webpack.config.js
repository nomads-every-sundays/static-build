const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const babelConfig = require('../babel.config.json');

console.log(path.resolve(__dirname, '../src/js/main.js'));
console.log(path.resolve(__dirname, '../src/html'));

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/js/main.js'),
        vue:  'vue/dist/vue.esm.js',
        'font-awesome-core': '@fortawesome/fontawesome-svg-core/index.es.js',
        'font-awesome-vue': '@fortawesome/vue-fontawesome/index.es.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
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
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.resolve(__dirname, `../dist/css/`),
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // sourceMap: !env.production,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            // sourceMap: !env.production,
                            config: {
                                path: 'postcss.config.js',
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            // sourceMap: !env.production,
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
                    publicPath: path.resolve(__dirname, '../dist/img'),
                },
            },
            {
                test: /\.(html)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: path.resolve(__dirname, '../dist'),
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
                    to: path.resolve(__dirname, '../dist/img'),
                },
                {
                    from: path.resolve(__dirname, '../src/fonts'),
                    to: path.resolve(__dirname, '../dist/fonts'),
                },
                {
                    from: path.resolve(__dirname, '../src/html'),
                    to: path.resolve(__dirname, '../dist'),
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
