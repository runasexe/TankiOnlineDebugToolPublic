const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");


const buildMode = 'production';
const buildIndex = 'moduled';
const buildType = 'data';

const { getEntryPoints } = require('./webpack-build-' + buildType + '-' + buildIndex);

const configBuild = [];
const configData = getEntryPoints(__dirname, buildMode);

for (const configKey in configData) {
    configBuild.push({
        name: buildMode + '-' + buildType + '-' + buildIndex + '-' + configKey,
        mode: buildMode,
        entry: configData[configKey],
        devtool: 'source-map',
        //stats: 'verbose',
        output: {
            filename: configKey + '.[contenthash].bundle.js',
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
}

module.exports = configBuild;
