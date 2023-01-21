const path = require('path');
const { readdirSync, existsSync } = require('fs');

const getEntryPointsSimple = ((modulesPath, nameGroup, mode) => {
    nameGroup = nameGroup || 'default';
    var entriesInfo = {};
    readdirSync(modulesPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => ({ 'name': dirent.name }))
        .map((info) => (
            info.file = (
                ['entry-' + mode + '.js', 'entry.js']
                    .map((file) => path.resolve(modulesPath, info.name, file))
                    .filter(file => existsSync(file))
            ).shift(), info
        ))
        .filter((info) => info.file)
        .map(info => { entriesInfo[nameGroup + '-' + info.name] = [info.file] });
    return entriesInfo;
});

const getEntryPointsBuild = ((modulesPath, nameGroup, mode) => {
    nameGroup = nameGroup || 'default';
    var entriesInfo = {};
    readdirSync(modulesPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => ({ 'name': dirent.name }))
        .map(info => (info.file = path.resolve(modulesPath, info.name, 'build.js'), info))
        .filter(info => existsSync(info.file))
        .map(info => (info.content = require(info.file), info))
        .map(info => (info.build = (info.content['build_' + mode] || info.content.build), info))
        .filter(info => info.build)
        .map(info => (
            info.build().map(record => (
                entriesInfo[nameGroup + '-' + info.name + '-' + record.name] = record.entries
                    .map(file => path.resolve(path.dirname(info.file), file))
                    .filter(file => existsSync(file))
            ))
        ));
    return entriesInfo;
});

const getEntryPoints = ((mode) => {
    mode = (mode || 'default');
    var entryList = {};
    entryList = Object.assign({}, entryList, getEntryPointsSimple(path.resolve(__dirname, 'src'), 'global', mode))
    entryList = Object.assign({}, entryList, getEntryPointsBuild(path.resolve(__dirname, 'src'), 'global', mode));
    entryList = Object.assign({}, entryList, getEntryPointsSimple(path.resolve(__dirname, 'src', 'modules'), 'module', mode));
    entryList = Object.assign({}, entryList, getEntryPointsBuild(path.resolve(__dirname, 'src', 'modules'), 'module', mode));
    return entryList;
});

module.exports = { getEntryPoints };
