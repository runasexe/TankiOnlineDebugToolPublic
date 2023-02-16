const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");


const buildMode = 'production';
const buildType = 'extension';


const { getEntryPoints } = require('./webpack-build-' + buildType);

const configBuild = [];
const configData = getEntryPoints(__dirname, buildMode);

for (const configKey in configData) {
    configBuild.push({
        name: buildMode + '-' + buildType,
        mode: buildMode,
        entry: configData[configKey],
        devtool: 'source-map',
        //stats: 'verbose',
        output: {
            filename: configKey + '.js',
            path: path.resolve(__dirname, 'dist', buildMode, buildType),
            hashDigestLength: 8,
            // globalObject: 'window',
        },
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()],
            mergeDuplicateChunks: true,
        }
    });
};

module.exports = configBuild;

