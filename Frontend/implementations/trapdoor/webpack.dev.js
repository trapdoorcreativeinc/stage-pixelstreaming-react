// Copyright Epic Games, Inc. All Rights Reserved.

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const loader = require('sass-loader');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
        historyApiFallback: true,
        hot: true,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                router: () => 'http://localhost:5001',
                logLevel: 'debug'
            },
        }
    },
    loader: {
        loader: 'sass-loader',
        options: {
            sourceMap: true,
        }
    },
    watch: true
});
