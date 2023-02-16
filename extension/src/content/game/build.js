const path = require('path');
const { getEntryPoints } = require('../../../../webpack-build-data-static');

module.exports = {
    build: ((mode) => ([
        {
            name: 'main',
            entries: getEntryPoints(path.resolve(__dirname, '..', '..', '..', '..'), mode)
        }
    ]))
}