const path = require('path');



const buildMode = 'development';
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
        }
    });
};

module.exports = configBuild;

