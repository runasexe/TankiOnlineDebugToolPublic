const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");


const buildMode = 'production';
const buildIndex = 'static';
const buildType = 'data';

const { getEntryPoints } = require('./webpack-build-' + buildType + '-' + buildIndex);

const configBuild = [];
const configData = getEntryPoints(__dirname, buildMode);

configBuild.push({
    name: buildMode + '-' + buildType + '-' + buildIndex,
    mode: buildMode,
    entry: configData,
    devtool: 'source-map',
    //stats: 'verbose',
    output: {
        filename: buildMode + '-' + buildType + '-' + buildIndex + '.[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist', buildMode, buildType, buildIndex),
        hashDigestLength: 8,
        // globalObject: 'window',
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        mergeDuplicateChunks: true,
    }
});
module.exports = configBuild;
