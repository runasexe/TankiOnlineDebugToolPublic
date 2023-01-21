const path = require('path');

const { getEntryPoints } = require('./webpack-build-static');

const buildMode = 'development';
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
    }
});

module.exports = configBuild;

