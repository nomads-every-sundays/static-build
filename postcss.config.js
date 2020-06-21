module.exports = ({ options }) => {
    const plugins = [];

    // If we building for production
    // if (options.cssnano) {
    //     plugins.push(require('cssnano'));
    // }

    plugins.push(require('autoprefixer'));

    return {
        parser: 'postcss-scss',
        plugins: plugins
    };
};