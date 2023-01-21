const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const { getEntryPoints } = require('./webpack-build');

let buildId = 'production';
let configBuild = [];
let configData = getEntryPoints(buildId);

for (let configKey in configData) {
    configBuild.push({
        name: buildId + '-' + configKey,
        mode: buildId,
        entry: configData[configKey],
        devtool: 'source-map',
        //stats: 'verbose',
        output: {
            filename: configKey + '.[contenthash].bundle.js',
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
}

module.exports = configBuild;