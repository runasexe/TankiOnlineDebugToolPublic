/**
 * Этот модуль содержит процедуру запуска для NodeJS.
 */

const { consoleContext } = require('/src/utils/context');

const unitSignals = {
    applicationNodeJS: ((coreContext) => {
        coreContext.logger.error("Can't actions to run in NodeJS");
    })
};

module.exports = { unitSignals };

