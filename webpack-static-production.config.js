const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const { getEntryPoints } = require('./webpack-build-static');

const buildMode = 'production';
const buildId = 'static-' + buildMode;
const configBuild = [];
const configData = getEntryPoints(buildMode);

configBuild.push({
    name: buildId,
    mode: buildMode,
    entry: configData,
    devtool: 'source-map',
    //stats: 'verbose',
    output: {
        filename: buildId + '.[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist', buildId),
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
