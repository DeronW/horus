const webpack = require('webpack')
const path = require('path')

const Module = {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                babelrc: false,
                presets: [['@babel/preset-env', {
                    "targets": {
                        "browsers": ["last 2 versions", "safari >= 7"]
                    }
                }]]
            }
        }
    }]
}

module.exports = [{
    entry: "./horus.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'horus.min.js',
        library: 'Horus',
        libraryTarget: 'umd'
    },
    optimization: {
        minimize: true
    },
    module: Module
}, {
    entry: "./horus.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'horus.simple.min.js',
        library: 'Horus',
        libraryTarget: 'umd'
    },
    externals: {
        'js-cookie': {
            commonjs: 'js-cookie',
            commonjs2: 'js-cookie',
            amd: 'js-cookie',
            root: 'JSCookie'
        },
        'js-base64': {
            commonjs: 'js-base64',
            commonjs2: 'js-base64',
            amd: 'js-base64',
            root: 'JSBase64'
        },
        'ua-parser-js': {
            commonjs: 'ua-parser-js',
            commonjs2: 'ua-parser-js',
            amd: 'ua-parser-js',
            root: 'UAParser'
        }
    },
    optimization: {
        minimize: true
    },
    module: Module
}]