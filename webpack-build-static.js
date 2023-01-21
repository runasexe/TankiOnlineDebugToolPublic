const { getEntryPoints } = require('./webpack-build');

const getEntryPointsStatic = ((mode, ...args) => {
    mode = (mode || 'default');
    const values = getEntryPoints(mode, ...args);
    let fileList = [];
    for(const entryName in values) {
        fileList = fileList.concat(values[entryName]);
    }
    return fileList;
});

module.exports = {
    getEntryPoints: getEntryPointsStatic
};
