const path = require('path');
const { getEntryPointsSimple, getEntryPointsBuild } = require('./webpack-build');

/**
 * Параметры компиляции расширения 
 * @param {string} mode 
 * @returns {[name: string]: [string]}
 */
const getEntryPoints = ((root, mode) => {
    mode = (mode || 'default');
    var entryList = {};

    // Файлы фонового сервиса:
    entryList['serviceWorker'] = [
        path.resolve(root, 'extension', 'src', 'serviceWorker.js')
    ];

    // Файлы скриптов внедрения на страницы:
    entryList = Object.assign({}, entryList, getEntryPointsSimple(path.resolve(root, 'extension', 'src', 'content'), 'content', mode));
    entryList = Object.assign({}, entryList, getEntryPointsBuild(path.resolve(root, 'extension', 'src', 'content'), 'content', mode));

    // Файлы скриптов внедрения на панель инструментов разработчика:
    entryList = Object.assign({}, entryList, getEntryPointsSimple(path.resolve(root, 'extension', 'src', 'devtools'), 'devtools', mode));
    entryList = Object.assign({}, entryList, getEntryPointsBuild(path.resolve(root, 'extension', 'src', 'devtools'), 'devtools', mode));

    // Файлы скриптов песочницы:
    entryList = Object.assign({}, entryList, getEntryPointsSimple(path.resolve(root, 'extension', 'src', 'sandbox'), 'sandbox', mode));
    entryList = Object.assign({}, entryList, getEntryPointsBuild(path.resolve(root, 'extension', 'src', 'sandbox'), 'sandbox', mode));

    // Прочие файлы на верхнем уровне:
    entryList = Object.assign({}, entryList, getEntryPointsSimple(path.resolve(root, 'extension', 'src'), 'global', mode))
    entryList = Object.assign({}, entryList, getEntryPointsBuild(path.resolve(root, 'extension', 'src'), 'global', mode));

    return entryList;
});

module.exports = {
    getEntryPoints
};
