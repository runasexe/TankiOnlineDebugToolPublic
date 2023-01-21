const path = require('path');

const { getEntryPoints } = require('./webpack-build');

const buildMode = 'development';
const buildId = buildMode;
const configBuild = [];
const configData = getEntryPoints(buildId);

for (const configKey in configData) {
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
        }
    });
}

module.exports = configBuild;

