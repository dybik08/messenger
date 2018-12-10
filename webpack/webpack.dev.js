const merge = require('webpack-merge');
const common = require('./webpack.config.dev');

module.exports = merge(common, {
    devtool: 'source-map',
    mode: 'development'
});
