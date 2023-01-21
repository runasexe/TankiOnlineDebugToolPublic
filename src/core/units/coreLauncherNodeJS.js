/**
 * Этот модуль содержит процедуру запуска для NodeJS.
 */

const { consoleContext } = require('/src/utils/context');

const unitSignals = {
    applicationNodeJS: ((coreContext) => {
        consoleContext.error("Can't actions to run in NodeJS");
    })
};

module.exports = { unitSignals };

