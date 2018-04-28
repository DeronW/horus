const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: "./horus.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'horus.min.js'
    },
    optimization: {
        minimize: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                babelrc: false,
                options: {
                    presets: [['@babel/preset-env', {
                        "targets": {
                            "browsers": ["last 2 versions", "safari >= 7"]
                        }
                    }]]
                }
            }
        }]
    }
};