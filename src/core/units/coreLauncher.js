/**
 * Этот модуль содержит процедуру запуска.
 * В зависимости от вида интерпретатора нвызывает функцию запуска ядл этого интерпетатора
 */

const { getInterpreterType } = require('/src/utils/context');

const unitSignals = {
    application: ((coreContext) => {
        coreContext.units.signal('application' + getInterpreterType());
        coreContext.units.destroy();
    }),
    applicationUnknown: ((coreContext) => {
        coreContext.logger.error("Can't actions to run: Unknown interpreter");
    })
};

module.exports = { unitSignals };

