const path = require('path');
const { getEntryPointsSimple, getEntryPointsBuild } = require('./webpack-build');

const getEntryPoints = ((root, mode) => {
    mode = (mode || 'default');
    var entryList = {};

    entryList = Object.assign({}, entryList, getEntryPointsSimple(path.resolve(root, 'src', 'modules'), 'module', mode));
    entryList = Object.assign({}, entryList, getEntryPointsBuild(path.resolve(root, 'src', 'modules'), 'module', mode));
    
    entryList = Object.assign({}, entryList, getEntryPointsSimple(path.resolve(root, 'src'), 'global', mode))
    entryList = Object.assign({}, entryList, getEntryPointsBuild(path.resolve(root, 'src'), 'global', mode));

    return entryList;
});

module.exports = {
    getEntryPoints
};

