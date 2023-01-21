/**
 * Этот файл отвечает за сборку ядра
 */

// Основные процедуры вынесены в отдельный файл "./coreUtils"
const { moduleCreateCore } = require('./coreUtils');
const { defaultModuleCreateSignals } = require('/src/utils/module')

// Сборка модуля ядра
module.exports = moduleCreateCore(((coreContext) => {
    // Мета-информация о модуле
    coreContext.info.name = 'Tanki Online: Core';
    coreContext.info.version = '1.0.1';
    coreContext.info.versionAlpha = true;
    coreContext.info.versionBeta = false;

    // Импорт компонентов ядра:
    // > Подсистема отладки:
    coreContext.units.register(require('./units/logger'));
    // > Подсистема обработки событий:
    coreContext.units.register(require('./units/event'));
    // > Подсистема менеджмента модулей:
    coreContext.units.register(require('./units/moduleManager'));
    // > Подсистема регистрации модулей:
    coreContext.units.register(require('./units/moduleListener'));
    // > Подсистема локализации:
    coreContext.units.register(require('./units/i18n'));
    // > Лаунчер ядра:
    coreContext.units.register(require('./units/coreLauncher'));
    // > Лаунчер ядра для браузера:
    coreContext.units.register(require('./units/coreLauncherBrowser'));
    // > Лаунчер ядра для браузера:
    coreContext.units.register(require('./units/coreLauncherNodeJS'));
}), defaultModuleCreateSignals);

