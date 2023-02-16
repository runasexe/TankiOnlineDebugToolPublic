const { getEntryPointsSimple, getEntryPointsBuild } = require('./webpack-build');
const { getEntryPoints: getEntryPointsModuled } = require('./webpack-build-data-moduled');

const getEntryPoints = ((root, mode, ...args) => {
    mode = (mode || 'default');
    const values = getEntryPointsModuled(root, mode, ...args);
    let fileList = [];
    for(const entryName in values) {
        fileList = fileList.concat(values[entryName]);
    }
    return fileList;
});

module.exports = {
    getEntryPoints
};
