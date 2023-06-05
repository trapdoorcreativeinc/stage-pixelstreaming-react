// Copyright Epic Games, Inc. All Rights Reserved.

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const loader = require('sass-loader');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        usedExports: true,
        minimize: true
    },
    stats: 'errors-only',
    performance: {
        hints: false
    },
    loader: {
        loader: 'sass-loader',
        options: {
            sourceMap: false,
        }
    }
});
