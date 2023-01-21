/**
 * Этот модуль содержит базовые инструменты для логирования и передачи параметров в консоль
 * 
 * Notice:
 * Информация:
 *  Используйте отдельный модуль для переопределения любого из указанных классов
 */

const { projectName } = require('/config/project');
const { styleLoggerProject, styleLoggerModule } = require('/config/debug');
const { consoleContext } = require('/src/utils/context');

/**
 * Класс для вывода информации в консоль браузера
 * Выводит информацию с сохранением пользовательского форматирования, предваряя ее заранее указанной информацией с указанным стилем
 */
class LoggerBrowser {
    outData = null;
    console = null;
    outStyle = null;

    /**
     * Конструктор
     * 
     * @param {string} outData - Информация для вывода в консоль, предваряя пользоватльские параметры
     * @param {Console} consoleObject - Оригинальный объект, предоставляемый API интерпретатора
     * @param {string} outStyle - Стиль для вывода информации, указанной в outData
     */
    constructor(outData, consoleObject, style) {
        this.outData = (outData || null);
        this.console = (consoleObject || consoleContext || null);
        this.outStyle = (style || null);

        let propertyInfo = {};

        Object.getOwnPropertyNames(this.console)
            .filter((propertyName => (typeof(this.console[propertyName]) == 'function')), this)
            .map(((functionName) => {
                let propertyData = propertyInfo[functionName] = {
                    writable: false,
                };
                if (['log', 'info', 'warn', 'error'].indexOf(functionName) != (-1)) {
                    propertyData.value = ((...args) => {
                        let formatedArgs = args;
                        if(this.outData && formatedArgs.length) {
                            if(typeof(formatedArgs[0]) == 'string') {
                                formatedArgs = ["%c[" + this.outData + "]%c " + formatedArgs[0], this.outStyle, null].concat(formatedArgs.slice(1));
                            } else {
                                formatedArgs = ["%c[" + this.outData + "]%c", this.outStyle, null].concat(formatedArgs);
                            }
                        }
                        this.console[functionName].apply(this.console, formatedArgs);
                    }).bind(this);
                } else {
                    propertyData.value = ((...args) => {
                        this.console[functionName].apply(this.console, args);
                    }).bind(this);
                }
            }), this);
        Object.defineProperties(this, propertyInfo);
    }
};


const unitSignals = {
    // Инициализация компонентов ядра
    init: ((coreContext) => {
        coreContext.logger = new coreContext.LoggerBrowser(projectName, null, styleLoggerProject);
    }),
    // Загрузка базовых параметров ядра
    event: ((coreContext) => {
        // Прослушиватель событий при импорте модуля
        // Добавляет свойство "logger" модуля с указанием ID модуля и стилем
        coreContext.event.addEventListener(coreContext.ModuleImportEvent.eventType, ((event) => {
            let module = (event.module || null);

            if(!module) {
                return;
            }

            module.logger = new coreContext.LoggerBrowser(module.id, coreContext.logger, styleLoggerModule);
        }));
    })
};

module.exports = { LoggerBrowser, unitSignals };

