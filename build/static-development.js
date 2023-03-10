/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\config\\debug.js":
/*!*********************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\config\debug.js ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {
    debugName: 'tankiOnlineDebug',
    styleLoggerProject: 'color: rgb(242, 171, 38);',
    styleLoggerModule: 'color: rgb(21, 128, 0);'
};



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\config\\moduleConnection.js":
/*!********************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\config\moduleConnection.js ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {
    moduleListenerName: 'tankiOnlineDebugModuleListener'
};



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\config\\project.js":
/*!***********************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\config\project.js ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {
    projectName: 'Tanki Online Debug'
};



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\coreUtils.js":
/*!***************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\core\coreUtils.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * В этот файл вынесены инструменты сборки ядра
 */
const { Module } = __webpack_require__(/*! ./units/moduleManager */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\moduleManager.js");

/**
 * Функция создания содуля ядра
 * 
 * @function
 * 
 * @param {*} callback - Функция, вызываемая после создания пустого модуля ядра
 * @returns
 */
const moduleCreateCore = ((...args) => {
    // Создание модуля ядра
    const coreContext = new Module('core', {
        // Метка модуля как загруженного, для предотвращения инициализации
        loaded: true,
        // Информация о модуле
        info: {
            versionProduction: null,
            versionDevelopment: null
        }
    });
    // При импорте модуля будет возвращен объект модуля
    coreContext.exports = coreContext;
    
    // Специальные метки объекта
    Object.defineProperty(coreContext, '__isCore', {writable: false, value: true});
    Object.defineProperty(coreContext, '__isModule', {writable: false, value: true});
    Object.defineProperty(coreContext, '__dataType', {writable: false, value: 'Module'});
    
    // Вызов функции инициализации после создания модуля ядра
    args.map(callback => callback.call(coreContext, coreContext, coreContext));

    // Возврат модуля ядра
    return coreContext;
});

module.exports = { moduleCreateCore };



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\entry-development.js":
/*!***********************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\core\entry-development.js ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const moduleContext = __webpack_require__(/*! ./entry */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\entry.js");
const { forceDebugContext } = __webpack_require__(/*! ../../../../../src/utils/context */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\context.js");
const { debugName } = __webpack_require__(/*! ../../../../../config/debug */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\config\\debug.js");

moduleContext.info.versionDevelopment = true;
forceDebugContext[debugName] = (forceDebugContext[debugName] || {});
Object.defineProperty(forceDebugContext[debugName], moduleContext.id, {
    writable: false,
    value: moduleContext
});

module.exports = moduleContext;



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\entry.js":
/*!***********************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\core\entry.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Этот файл отвечает за сборку ядра
 */

// Основные процедуры вынесены в отдельный файл "./coreUtils"
const { moduleCreateCore } = __webpack_require__(/*! ./coreUtils */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\coreUtils.js");
const { defaultModuleCreateSignals } = __webpack_require__(/*! ../../../../../src/utils/module */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\module.js")

// Сборка модуля ядра
module.exports = moduleCreateCore(((coreContext) => {
    // Мета-информация о модуле
    coreContext.info.name = 'Tanki Online: Core';
    coreContext.info.version = '1.0.1';
    coreContext.info.versionAlpha = true;
    coreContext.info.versionBeta = false;

    // Импорт компонентов ядра:
    // > Подсистема отладки:
    coreContext.units.register(__webpack_require__(/*! ./units/logger */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\logger.js"));
    // > Подсистема обработки событий:
    coreContext.units.register(__webpack_require__(/*! ./units/event */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\event.js"));
    // > Подсистема менеджмента модулей:
    coreContext.units.register(__webpack_require__(/*! ./units/moduleManager */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\moduleManager.js"));
    // > Подсистема регистрации модулей:
    coreContext.units.register(__webpack_require__(/*! ./units/moduleListener */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\moduleListener.js"));
    // > Подсистема локализации:
    coreContext.units.register(__webpack_require__(/*! ./units/i18n */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\i18n.js"));
    // > Лаунчер ядра:
    coreContext.units.register(__webpack_require__(/*! ./units/coreLauncher */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\coreLauncher.js"));
    // > Лаунчер ядра для браузера:
    coreContext.units.register(__webpack_require__(/*! ./units/coreLauncherBrowser */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\coreLauncherBrowser.js"));
    // > Лаунчер ядра для браузера:
    coreContext.units.register(__webpack_require__(/*! ./units/coreLauncherNodeJS */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\coreLauncherNodeJS.js"));
}), defaultModuleCreateSignals);



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\coreLauncher.js":
/*!************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\core\units\coreLauncher.js ***!
  \************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Этот модуль содержит процедуру запуска.
 * В зависимости от вида интерпретатора нвызывает функцию запуска ядл этого интерпетатора
 */

const { getInterpreterType } = __webpack_require__(/*! ../../../../../src/utils/context */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\context.js");

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



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\coreLauncherBrowser.js":
/*!*******************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\core\units\coreLauncherBrowser.js ***!
  \*******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Этот модуль содержит процедуру запуска для браузера.
 */

const { globalContext } = __webpack_require__(/*! ../../../../../src/utils/context */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\context.js");
const { CoreEvent } = __webpack_require__(/*! ./event */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\event.js");

// Событие при остановке прослушивания модулей
class ModuleListenerStopEvent extends CoreEvent {
    constructor() {
        super("moduleListenerStop", {cancelable: true});
    }
};
ModuleListenerStopEvent.eventType = "core.moduleListenerStop";

const unitSignals = {
    applicationBrowser: ((coreContext) => {
        coreContext.units.signal('applicationPrev');
        // Вызываем эту функцию при загрузке документа
        const loadProc = (async () => {
            // Отправка сигналов загруженным модулям
            await coreContext.modules.signals.signalModulesLoad(coreContext);
            
            // Остановка регистратора модулей
            if(coreContext.event.dispatchEvent(new coreContext.ModuleListenerStopEvent())) {
                coreContext.moduleListener.listenStop();
            }

            // Вызываем сигнал applicationPost - документ загружен
            coreContext.units.signal('applicationPost');
        });
        // Если мы можем определить событие загрузки документа
        if(globalContext instanceof EventTarget) {
            if((globalContext.document) && (globalContext.document.readyState) && (globalContext.document.readyState == 'complete')) {
                loadProc();
            } else {
                globalContext.addEventListener("load", loadProc);
            }
        } else {
            // Иначе вызываем loadProc - документ загружен
            loadProc();
        }
    })
};

module.exports = {
    ModuleListenerStopEvent,
    unitSignals
};



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\coreLauncherNodeJS.js":
/*!******************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\core\units\coreLauncherNodeJS.js ***!
  \******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Этот модуль содержит процедуру запуска для NodeJS.
 */

const { consoleContext } = __webpack_require__(/*! ../../../../../src/utils/context */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\context.js");

const unitSignals = {
    applicationNodeJS: ((coreContext) => {
        coreContext.logger.error("Can't actions to run in NodeJS");
    })
};

module.exports = { unitSignals };



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\event.js":
/*!*****************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\core\units\event.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Этот модуль содержит инструменты для определения и вызова событий.
 */

const { consoleContext } = __webpack_require__(/*! ../../../../../src/utils/context */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\context.js");

// Менеджер событий
class EventManager extends EventTarget {};

// Событие. Аналог CustomEvent, который может быть не определен
class GlobalEvent extends Event {
    detail = null;
    constructor(eventName, eventInitDict) {
        let detail = null;
        if(eventInitDict && eventInitDict.detail) {
            detail = eventInitDict.detail;
            delete eventInitDict.detail;
        }
        super(eventName, eventInitDict);
        this.detail = detail;
    }
};

// Событие модуля
class ModuleEvent extends GlobalEvent {
    module = null;
    constructor(module, eventName, eventInitDict) {
        if(!module || !module.id) {
            consoleContext.error('Send ModuleEvent with empty module:', module);
            super("NoModuleEvent", eventInitDict);
            this.eventName = eventName;
        } else {
            super(module.id + "." + eventName, eventInitDict);
        }
        this.module = module;
    }
};

// Событие ядра
class CoreEvent extends ModuleEvent {
    constructor(eventName, eventInitDict) {
        super(CoreEvent.coreContext, eventName, eventInitDict);
    }
};

const unitSignals = {
    init: ((coreContext) => {
        CoreEvent.coreContext = coreContext;
        coreContext.event = new coreContext.EventManager();
    })
};

module.exports = {
    EventManager,
    GlobalEvent,
    ModuleEvent,
    CoreEvent,
    unitSignals
};



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\i18n.js":
/*!****************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\core\units\i18n.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { getValue } = __webpack_require__(/*! ../../../../../src/utils/context */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\context.js");
const defaultLangMutate = __webpack_require__(/*! ../../../../../config/defaultLocalizationMutate.json */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\config\\defaultLocalizationMutate.json");

// TODO: Идет разработка транслятора
//  В планах, перевести на них все сообщения ядра (а затем и модулей, с индивидуальными трансляторами)

class Translator {
    languareData = null;
    languareCurrent = null;
    languareMutations = null;

    constructor(languare) {
        this.languareData = {};
        this.languareMutations = {};
        this.languareCurrent = (languare || (e => (e ? e.language : null))(getValue('navigator')) || 'default');
    }

    import(content) {
        let scanState = null;
        let currentData = null;
        for(let currentLanguare in content) {
            scanState = true;
            currentData = content[currentLanguare];
            while(scanState) {
                scanState = false;
                for(let keyName in currentData) {
                    if((typeof(currentData[keyName]) == 'string') || (typeof(currentData[keyName]) == 'number')) {
                        currentData[keyName.toLocaleLowerCase()] = currentData[keyName];
                        delete currentData[keyName];
                    } else if((typeof(currentData[keyName]) == 'object') && (currentData[keyName] !== null)) {
                        scanState = true;
                        for(let keyNameSecond in currentData[keyName]) {
                            currentData[keyName.toLocaleLowerCase() + '.' + keyNameSecond.toLocaleLowerCase()] = currentData[keyName][keyNameSecond];
                            delete currentData[keyName][keyNameSecond];
                        }
                    }
                }
            }
            this.languareData[currentLanguare] = (this.languareData[currentLanguare] || {});
            Object.assign(this.languareData[currentLanguare], currentData);
        }
    }

    mutate(mutateDictionary) {
        Object.assign(this.languareMutations, mutateDictionary);
        this.languare = this.languare
    }

    mutateUpdate(languare) {
        languare = (languare || this.languareCurrent);
        while(languare in this.languareMutations) {
            languare = this.languareMutations[languare];
        }
        this.languareCurrent = languare;
    }

    get languare() {
        return this.languareCurrent;
    }

    set languare(value) {
        this.mutateUpdate(value);
    }

    get(name) {
        this.languareData[this.languareCurrent] = (this.languareData[this.languareCurrent] || {});
        return (this.languareData[this.languareCurrent][name] || null);
    }

    set(name, value) {
        this.languareData[this.languareCurrent] = (this.languareData[this.languareCurrent] || {});
        this.languareData[this.languareCurrent][name] = value;
    }
};

const unitSignals = {
    init: ((coreContext) => {
        coreContext.i18n = new coreContext.Translator();
    }),
    load: ((coreContext) => {
        coreContext.i18n.mutate(defaultLangMutate);
        coreContext.i18n.mutateUpdate();
    })
};

module.exports = { Translator, unitSignals };



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\logger.js":
/*!******************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\core\units\logger.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Этот модуль содержит базовые инструменты для логирования и передачи параметров в консоль
 * 
 * Notice:
 * Информация:
 *  Используйте отдельный модуль для переопределения любого из указанных классов
 */

const { projectName } = __webpack_require__(/*! ../../../../../config/project */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\config\\project.js");
const { styleLoggerProject, styleLoggerModule } = __webpack_require__(/*! ../../../../../config/debug */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\config\\debug.js");
const { consoleContext } = __webpack_require__(/*! ../../../../../src/utils/context */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\context.js");

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



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\moduleListener.js":
/*!**************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\core\units\moduleListener.js ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { connectContext, globalContext } = __webpack_require__(/*! ../../../../../src/utils/context */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\context.js");
const { Module } = __webpack_require__(/*! ./moduleManager */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\moduleManager.js");
const { moduleListenerName } = __webpack_require__(/*! ../../../../../config/moduleConnection */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\config\\moduleConnection.js");
const { GlobalEvent, CoreEvent } = __webpack_require__(/*! ./event */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\event.js");
const { sharedCore } = __webpack_require__(/*! ../../../../../src/utils/features */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\features.js");

class ListenerRecvEvent extends CoreEvent {
    recv = null;
    recvPrevious = null;

    constructor(recv, recvPrevious) {
        super("ModuleListener.recv", {cancelable: true});
        this.recv = (recv || null);
        this.recvPrevious = (recvPrevious || null);
    }
};
ListenerRecvEvent.eventType = "core.ModuleListener.recv";

class ListenerRecvModuleEvent extends CoreEvent {
    module = null;
    recvPrevious = null;

    constructor(module, recvPrevious) {
        super("ModuleListener.recvModule", {cancelable: true});
        this.module = (module || null);
        this.recvPrevious = (recvPrevious || null);
    }
};
ListenerRecvModuleEvent.eventType = "core.ModuleListener.recvModule";

class ListenerRecvModuleTemplateEvent extends CoreEvent {
    moduleTemplate = null;
    recvPrevious = null;

    constructor(moduleTemplate, recvPrevious) {
        super("ModuleListener.recvModuleTemplate", {cancelable: true});
        this.moduleTemplate = (moduleTemplate || null);
        this.recvPrevious = (recvPrevious || null);
    }
};
ListenerRecvModuleTemplateEvent.eventType = "core.ModuleListener.recvModuleTemplate";

class ListenerRecvDataEvent extends CoreEvent {
    data = null;
    recvPrevious = null;

    constructor(data, recvPrevious) {
        super("ModuleListener.recvData", {cancelable: true});
        this.data = (data || null);
        this.recvPrevious = (recvPrevious || null);
    }
};
ListenerRecvDataEvent.eventType = "core.ModuleListener.recvData";

class ListenerProcessModuleEvent extends CoreEvent {
    module = null;
    recvPrevious = null;

    constructor(module, recvPrevious) {
        super("ModuleListener.processModule", {cancelable: true});
        this.module = (module || null);
        this.recvPrevious = (recvPrevious || null);
    }
};
ListenerProcessModuleEvent.eventType = "core.ModuleListener.processModule";

// Специальное событие для передачи в модуль, который был загружен раньше
class ListenerModuleRequestEvent extends GlobalEvent {
    constructor(listenerName, callback) {
        super(listenerName + "ModuleRequest", {cancelable: true});
        this.registerCallback = callback;
    }
};

// Событие при импорте модуля
class ModuleImportEvent extends CoreEvent {
    module = null;
    constructor(module) {
        super("moduleImport", {cancelable: true});
        this.module = module;
    }
};
ModuleImportEvent.eventType = "core.moduleImport";
// СОбытие при вызове сигналов модуля
class ProcessModuleImportEvent extends CoreEvent {
    module = null;
    constructor(module) {
        super("signalModuleImport", {cancelable: true});
        this.module = module;
    }
};
ProcessModuleImportEvent.eventType = "core.signalModuleImport";

/**
 * Абстрактный регистратор модулей
 */
class ModuleListener extends EventTarget {
    coreContext = null;

    constructor(coreContext) {
        super();
        this.coreContext = coreContext;
    }
    

    /**
     * Запуск загрузчика модулей
     */
    listenStart() {}

    /**
     * Остановка загрузчика модулей
     */
    listenStop() {}

    callRecvObject(recvData) {
        if(this.dispatchEvent(new ListenerRecvEvent(recvData, null))) {
            this.onRecvDefault(recvData, null);
        }
    }

    onRecvDefault(data, recvPrevious) {
        if(!data) {
            return;
        }

        if((data.__isModuleTemplate) || (data.__dataType == 'ModuleTemplate')) {
            if(this.dispatchEvent(new ListenerRecvModuleTemplateEvent(data, recvPrevious))) {
                this.onRecvModuleTemplateDefault(data, recvPrevious);
            }
        } else if((data.__isModule) || (data.__dataType == 'Module')) {
            if(this.dispatchEvent(new ListenerRecvModuleEvent(data, recvPrevious))) {
                this.onRecvModuleDefault(data, recvPrevious);
            }
        } else {
            if(this.dispatchEvent(new ListenerRecvDataEvent(data, recvPrevious))) {
                this.onRecvDataDefault(data, recvPrevious);
            }
        }
    }
    onRecvModuleTemplateDefault(moduleTemplate, recvPrevious) {
        if(!moduleTemplate.id) {
            return;
        }

        let moduleContext = new Module(moduleTemplate.id);
        Object.defineProperty(moduleContext, '__isModule', {writable: false, value: true});
        Object.defineProperty(moduleContext, '__dataType', {writable: false, value: 'Module'});

        if((moduleTemplate.constructors) && (moduleTemplate.constructors instanceof Array)) {
            moduleTemplate.constructors
                .filter((constructorData) => (typeof(constructorData) == 'function'))
                .map((constructorFunction) => constructorFunction.call(moduleContext, moduleContext, this.coreContext));
        }
        
        this.dispatchEvent(new ListenerProcessModuleEvent(moduleContext, recvPrevious))
    }
    onRecvModuleDefault(module, recvPrevious) {
        this.dispatchEvent(new ListenerProcessModuleEvent(module, recvPrevious))
    }
    onRecvDataDefault(data, recvPrevious) {

    }
    
    /**
     * Функция определения регистратора, возвращает проиниализированный регистратор
     */
    static getModuleListener(coreContext, listenerName) {
        if(sharedCore.enabled && (!sharedCore.coreContext)) {
            return new SharedModuleListener(coreContext);
        } else if(connectContext instanceof EventTarget) {
            return new EventModuleListener(coreContext, connectContext, listenerName);
        } else {
            return new ContextModuleListener(coreContext, connectContext, listenerName);
        }
    }
};
/**
 * Регистратор модулей на основе событий.
 * Предпочтительный регистратор, т.к. нет простого способа обнаружить данный регистратор при рандомизации ключа даже при регистрации на globalThis
 */
class EventModuleListener extends ModuleListener {
    globalObject = null
    listenerName = null
    listenerCallback = null

    constructor(coreContext, globalObject, listenerName) {
        super(coreContext);
        this.globalObject = (globalObject || null);
        this.listenerName = (listenerName || null);
        this.listenerCallback = null;
    }
    
    listenStart(options) {
        if(this.listenerCallback) {
            return;
        }

        options = (options || {});

        this.globalObject.addEventListener(this.listenerName, (this.listenerCallback = ((event) => {
            if('status' in event) {
                event.status = true;
            }
            let data = (event.moduleTemplate || event.transferObject || null);
            if(!data) {
                event.preventDefault();
                return;
            }
            if(this.dispatchEvent(new ListenerRecvEvent(data, false))) {
                this.onRecvDefault(data, false);
            }
        })));
        this.globalObject.dispatchEvent(new ListenerModuleRequestEvent(this.listenerName, ((data) => {
            if(this.dispatchEvent(new ListenerRecvEvent(data, true))) {
                this.onRecvDefault(data, true);
            }
        }).bind(this)));
    }

    listenStop() {
        if(this.listenerCallback) {
            this.globalObject.removeEventListener(this.listenerName, this.listenerCallback);
            this.listenerCallback = null;
        }
    }
}
/**
 * Регистратор модулей на основе объектов
 */
class ContextModuleListener extends ModuleListener {
    globalObject = null
    listenerName = null

    constructor(coreContext, globalObject, listenerName) {
        super(coreContext);
        this.globalObject = (globalObject || null);
        this.listenerName = (listenerName || null);
    }
    
    listenStart(options) {
        options = (options || {});

        if (this.globalObject[this.listenerName]) {
            if ((this.globalObject[this.listenerName]) instanceof Array) {
                this.globalObject[this.listenerName].map(((recvData) => {
                    if(this.dispatchEvent(new ListenerRecvEvent(recvData, true))) {
                        this.onRecvDefault(recvData, true);
                    }
                }), this);
                this.globalObject[this.listenerName] = null;
                delete this.globalObject[this.listenerName];
            } else {
                return;
            }
        }
        Object.defineProperty(this.globalObject, this.listenerName, {
            enumerable: false,
            configurable: !(options.permanent),
            writable: false,
            value: ((recvData) => {
                if(this.dispatchEvent(new ListenerRecvEvent(recvData, false))) {
                    this.onRecvDefault(recvData, false);
                }
            }).bind(this)
        });
    }

    listenStop() {
        return (delete this.globalObject[this.listenerName]);
    }
}
/**
 * Объединенный файл, используются общие данные
 */
class SharedModuleListener extends ModuleListener {
    constructor(coreContext) {
        super(coreContext);
    }
    
    listenStart(options) {
        sharedCore.coreContext = this.coreContext;
        sharedCore.templateList.map((moduleTemplate) => this.installModuleTemplate(moduleTemplate));
        sharedCore.templateList = null;
    }

    installModule(module) {
        this.callRecvObject(module);
    }

    installModuleTemplate(moduleTemplate) {
        this.callRecvObject(moduleTemplate);
    }
}

const unitSignals = {
    // Инициализация компонента взаимодействия с модулями
    init: ((coreContext) => {
        coreContext.moduleListener = coreContext.ModuleListener.getModuleListener(coreContext, moduleListenerName);
    }),
    // Регистрация событий
    event: ((coreContext) => {
        coreContext.moduleListener.addEventListener(coreContext.ListenerProcessModuleEvent.eventType, (async (event) => {
            let module = (event.module || null);

            if(!module) {
                return;
            }
            
            if(coreContext.event.dispatchEvent(new coreContext.ModuleImportEvent(module))) {
                coreContext.modules.installModule(module);
                if(coreContext.event.dispatchEvent(new coreContext.ProcessModuleImportEvent(module))) {
                    for(var signalId = 0; signalId < coreContext.modules.signals.signalAutoloadList.length; signalId++) {
                        await Promise.all(module.signals.signal(coreContext.modules.signals.signalAutoloadList[signalId], coreContext));
                    }
                    
                }
            }
        }));
    }),
    applicationPrev: ((coreContext) => {
        coreContext.moduleListener.listenStart();
    })
};

module.exports = {
    ModuleListener,
    ContextModuleListener,
    EventModuleListener,
    ListenerRecvEvent,
    ListenerRecvModuleEvent,
    ListenerRecvModuleTemplateEvent,
    ListenerRecvDataEvent,
    ListenerProcessModuleEvent,
    ListenerModuleRequestEvent,
    ModuleImportEvent,
    ProcessModuleImportEvent,
    unitSignals
};

/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\units\\moduleManager.js":
/*!*************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\core\units\moduleManager.js ***!
  \*************************************************************************************/
/***/ ((module) => {

/**
 * В этот компонент вынесены инструменты управления с модулями
 */

/**
 * Класс исключения ModuleNotFoundError
 * Вызывается при ошибку импорта модуля
 */
class ModuleNotFoundError extends Error {
    moduleId = null;
    moduleManager = null;

    /**
     * Конструктор исключения
     * 
     * @param {string} moduleId - Идентификатор модуля, который не был найден
     * @param {ModuleManager} moduleManager - Объект менеджера модулей, вызвавшего исключение
     */
    constructor(moduleId, moduleManager) {
        super('Module "' + moduleId.toString() + '" not found in ModuleManager');
        this.moduleId = moduleId || null;
        this.moduleManager = moduleManager || null;
    }
};

/**
 * Обработчик сигналов компонентов модулей.
 * Отвечает за регистрацию и обработку сигналов компонентов.
 */
class UnitSignalManager {
    signals = null
    moduleContext = null

    constructor(moduleContext) {
        this.signals = {};
        this.moduleContext = moduleContext;
    }

    /**
     * Копирование свойств из импортированного компонента в модуль.
     * Если объявлен элемент "unitSignals", данные из него будут обработаны как сигналы.
     * Элемент "unitSignals" содержит словарь функций, которые должны быть вызваны на разных этапах загрузки модуля.
     * 
     * Warning:
     * Внимание:
     *  Слияние производится при помощи метода "Object.assign", вложенные данные будут перезаписаны!
     * 
     * @param {Object} unitContent - Объект, содержащий компонент модуля.
     */
    register(unitContent) {
        if(unitContent.unitSignals) {
            for(let signalId in unitContent.unitSignals) {
                this.signals[signalId] = (this.signals[signalId] || []);
                if(unitContent.unitSignals[signalId] instanceof Array) {
                    this.signals[signalId] = this.signals[signalId].concat(
                        unitContent.unitSignals[signalId]
                            .filter(callback => callback)
                            .filter(callback => (typeof(callback) == 'function'))
                    );
                } else if(typeof(unitContent.unitSignals[signalId]) == 'function') {
                    this.signals[signalId].push(unitContent.unitSignals[signalId]);
                }
                
            }
            delete unitContent.unitSignals;
        }
        Object.assign(this.moduleContext, unitContent);
    }

    /**
     * Осуществляет вызов сигнала для каждого компонента
     * 
     * @param {string} signalId - Сигнал
     * @param  {...any} args - Передаваемые аргументы
     * @returns 
     */
    signal(signalId, ...args) {
        if(!(signalId in this.signals)) {
            return [];
        }
        const result = this.signals[signalId]
            .filter(unitCallback => (typeof(unitCallback) == 'function'))
            .map(unitCallback => unitCallback.call(this.moduleContext, this.moduleContext, ...args))
            .filter((result) => (result instanceof Promise));
        delete this.signals[signalId];
        return result;
    }

    /**
     * Очистка словаря сигналов при загрузке.
     * 
     * Эта процедура выполняется, чтобы не перезаписать однажды созданные элементы похожими, для предотвращения различных багов.
     */
    destroy() {
        this.signals = {};
    }
};

/**
 * Обработчик сигналов модулей.
 * Отвечает за регистрацию и обработку сигналов модулей.
 */
class ModuleSignalManager {
    signals = null;
    moduleContext = null;

    constructor(moduleContext) {
        this.signals = {};
        this.moduleContext = moduleContext;
    }
    
    /**
     * Регистрация обработчика сигнала модуля
     * 
     * @param {string} signalId - Сигнал
     * @param  {...Function} signalCallbacks - Обработчики сигнала
     */
    register(signalId, ...signalCallbacks) {
        this.signals[signalId] = (this.signals[signalId] || []);
        this.signals[signalId] = this.signals[signalId].concat(
            signalCallbacks
                .filter(callback => callback)
                .filter(callback => (typeof(callback) == 'function'))
        );
    }
    
    /**
     * Вызов сигнала модуля
     * 
     * @param {string} signalId - Сигнал
     * @param  {...any} args - Передаваемые аргументы
     * @returns 
     */
    signal(signalId, ...args) {
        if(!(signalId in this.signals)) {
            return [];
        }
        const result = this.signals[signalId]
            .filter(signalCallback => (typeof(signalCallback) == 'function'))
            .map(signalCallback => signalCallback.call(this.moduleContext, this.moduleContext, ...args))
            .filter((result) => (result instanceof Promise));
        delete this.signals[signalId];
        return result;
    }
    
    destroy() {
        this.signals = {};
    }
};

/**
 * Обработчик сигналов менеджера модулей.
 * Вызывает сигналы модулей обрабатываемого менеджера модулей.
 */
class ModuleManagerSignalManager {
    coreContext = null;
    moduleManager = null;
    signalAutoloadList = null;

    constructor(coreContext, moduleManager) {
        this.coreContext = coreContext;
        this.moduleManager = moduleManager;
        this.signalAutoloadList = [];
    }
    
    signal(signal, ...args) {
        let resultAwait = [];
        for (const moduleId in this.moduleManager.modules) {
            resultAwait = resultAwait.concat(this.moduleManager.modules[moduleId].signals.signal(signal, ...args));
        }
        return resultAwait;
    }
    
    /**
     * Процедура загрузки модулей
     */
    async signalModulesLoad() {
        // Инициализация модуля
        await Promise.all(this.callModuleSignal('init'));
        // Регистрация обработчиков событий
        await Promise.all(this.callModuleSignal('event'));
        // Загрузка модуля, создание объектов взаимодействия
        await Promise.all(this.callModuleSignal('load'));
        // Загружены все модули
        await Promise.all(this.callModuleSignal('launch'));
        // Загрузка приложения, все модули загружены
        await Promise.all(this.callModuleSignal(['application', 'app', 'run']));
    }

    /**
     * Вызов сигналов модулей
     * 
     * @param {Array<string>} signalList - Массив сигналов
     * @returns {Array<Promise>} - Массив Promise, полученных в результате обработки сигналов
     */
    callModuleSignal(signalList) {
        if(typeof(signalList) == 'string') {
            signalList = [signalList];
        }
        
        this.signalAutoloadList = this.signalAutoloadList.concat(signalList);
        let resultAwait = [];
        signalList.map((signalName) => {
            resultAwait = resultAwait.concat(this.signal(signalName, this.coreContext));
        }, this);
        signalList.map(((signalName) => {
            this.coreContext.event.dispatchEvent(new this.coreContext.CoreEvent("modules.globalTarget." + signalName))
        }), this);
        return resultAwait;
    }
};

/**
 * Модуль
 */
class Module {
    id = null;
    require = null;
    loaded = null;
    info = null;
    exports = null;
    events = null;
    units = null;
    signals = null;

    /**
     * Конструктор модуля.
     * 
     * @constructor
     * @this { Module }
     * 
     * @param {string} id - Идентификатор модуля.
     * @param {Object} options - Параметры модуля со свойствами:
     * @param {void} options.require? - Функция, вызываемая при импорте модуля
     * @param {boolean} options.loaded? - Module loaded state
     * @param {Object} options.info? - Module info
     */
    constructor(id, options) {
        options = (options || {});

        this.id = (id || null);
        this.require = (options.require || ((module) => {module.exports = module;}));
        this.loaded = (options.loaded || false);
        this.info = (options.info || {});
        this.exports = {};
        this.events = new EventTarget();
        this.units = new UnitSignalManager(this);
        this.signals = new ModuleSignalManager(this);
    }
};
/**
 * Менеджер модулей
 */
class ModuleManager {
    modules = null;
    state = null;
    signals = null;
    coreContext = null;
    
    /**
     * Конструктор менеджера модулей
     * 
     * @param {Module} coreContext 
     */
    constructor(coreContext) {
        this.modules = {};
        this.state = {};
        this.coreContext = coreContext;
        this.signals = new ModuleManagerSignalManager(coreContext, this);

        this.require = ((moduleId) => {
            if (!(moduleId in this.modules)) {
                throw new ModuleNotFoundError(moduleId, this);
            }
            if (this.modules[moduleId].loaded) {
                return this.modules[moduleId].exports;
            }
            this.modules[moduleId].exports = {};
            if(this.modules[moduleId].require) {
                this.modules[moduleId].require.call(
                    this.modules[moduleId].exports,
                    this.modules[moduleId],
                    this.modules[moduleId].exports,
                    this.require
                );
            }
            this.modules[moduleId].loaded = true;
            return this.modules[moduleId].exports;
        }).bind(this);

        if(this.coreContext) {
            this.installModule(this.coreContext);
        }
    }

    /**
     * 
     * 
     * @this { ModuleManager }
     * 
     * @param module - The module object to install.
     * @param init - If true, the module will be initialized immediately.
     */
    installModule(module, init) {
        this.modules[module.id] = module;
        Object.defineProperty(this, module.id, {
            writable: false,
            value: module
        })
        Object.defineProperty(module, 'moduleManager', {
            writable: false,
            value: this
        })
        if (init) {
            this.require(module.id);
        }
    }
};

const unitSignals = {
    // Инициализация менеджера модулей, регистрация модуля ядра
    init: ((coreContext) => {
        coreContext.modules = new coreContext.ModuleManager(coreContext);
    }),
    // Добавление стандартного обработчика при импорте модуля
    load: ((coreContext) => {
        coreContext.modules.signals.signalAutoloadList.push('preinit');
    })
};

module.exports = {
    ModuleNotFoundError,
    UnitSignalManager,
    ModuleSignalManager,
    ModuleManagerSignalManager,
    Module,
    ModuleManager,
    unitSignals
};



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libHelper\\entry-development.js":
/*!************************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\libHelper\entry-development.js ***!
  \************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const moduleTemplate = __webpack_require__(/*! ./entry */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libHelper\\entry.js");
const { forceDebugContext } = __webpack_require__(/*! ../../../../../src/utils/context */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\context.js");
const { debugName } = __webpack_require__(/*! ../../../../../config/debug */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\config\\debug.js");

moduleTemplate.constructors.unshift((moduleContext) => {
    forceDebugContext[debugName] = (forceDebugContext[debugName] || {});
    Object.defineProperty(forceDebugContext[debugName], moduleContext.id, {
        writable: false,
        value: moduleContext
    });
});
moduleTemplate.send();

module.exports = moduleTemplate;



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libHelper\\entry.js":
/*!************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\libHelper\entry.js ***!
  \************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { moduleCreate } = __webpack_require__(/*! ../../../../../src/utils/module */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\module.js");

module.exports = moduleCreate('libHelper', ((moduleContext, coreContext) => {
    // moduleContext.info.name = 'Lib Helper';
    // moduleContext.info.version = '1.0.0';
    // moduleContext.info.versionAlpha = true;
    // moduleContext.info.versionBeta = false;
    
    moduleContext.units.register(__webpack_require__(/*! ./units/objectHelper */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libHelper\\units\\objectHelper.js"));
    moduleContext.units.register(__webpack_require__(/*! ./units/functionHelper */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libHelper\\units\\functionHelper.js"));
    moduleContext.units.register(__webpack_require__(/*! ./units/stringHelper */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libHelper\\units\\stringHelper.js"));
    moduleContext.units.register(__webpack_require__(/*! ./units/linkHelper */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libHelper\\units\\linkHelper.js"));
}));



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libHelper\\units\\functionHelper.js":
/*!***************************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\libHelper\units\functionHelper.js ***!
  \***************************************************************************************************/
/***/ ((module) => {

class FunctionHook {
    originalFunction = null;
    this = null;
    args = null;
    result = (void 0);

    constructor(originalFunction, runtimeThis, runtimeArgs) {
        this.originalFunction = originalFunction;
        this.runtimeThis = runtimeThis;
        this.args = runtimeArgs;
        this.result = (void 0);
    }

    callOriginal() {
        this.result = this.originalFunction.apply(this.this, this.args);
    }
};

class FunctionHelper {
    static pathFunction(object, propertyName, hookCallback) {
        if((!(propertyName in object)) || (typeof(object[propertyName]) != 'function')) {
            return false;
        }
        const originalFunction = object[propertyName];
        object[propertyName] = (function (...args) {
            let hookObject = new FunctionHook(originalFunction, this, args);
            hookCallback(hookObject);
            return hookObject.result;
        });
    }

    static pathFunctionSimpleBefore(object, propertyName, hookCallback) {
        if((!(propertyName in object)) || (typeof(object[propertyName]) != 'function')) {
            return false;
        }
        const originalFunction = object[propertyName];
        object[propertyName] = (function (...args) {
            hookCallback.apply(this, args);
            return originalFunction.apply(this, args);
        });
    }

    static pathFunctionSimpleAfter(object, propertyName, hookCallback) {
        if((!(propertyName in object)) || (typeof(object[propertyName]) != 'function')) {
            return false;
        }
        const originalFunction = object[propertyName];
        object[propertyName] = (function (...args) {
            let result = originalFunction.apply(this, args);
            hookCallback.apply(this, args);
            return result;
        });
    }
};

module.exports = {
    FunctionHook,
    FunctionHelper
};



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libHelper\\units\\linkHelper.js":
/*!***********************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\libHelper\units\linkHelper.js ***!
  \***********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { domContext } = __webpack_require__(/*! ../../../../../src/utils/context */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\context.js");

class LinkHelper {
    static getRoot(link) {
        const result = /^(?:[^\/]*:\/\/)?[^\/]+/.exec(link);
        if(result) {
            return result[0];
        }
        return link;
    }
    static getBase(link) {
        const result = /^[^?#]+\//.exec(link);
        if(result) {
            return result[0];
        }
        return link;
    }
    static linkAbsolute(link, linkPage) {
        if(!link || !linkPage) {
            return null;
        }
        if(link.startsWith('//')) {
            return 'https://' + link.slice(2);
        }
        if(link.startsWith('/')) {
            return LinkHelper.getRoot(linkPage) + link;
        }
        return LinkHelper.getBase(linkPage) + link;
    }
    static linkWithoutPage(originalLink) {
        let execResult = /^.*\//.exec(originalLink);
        if(execResult) {
            return execResult[0];
        }
        return originalLink;
    }
	static getSearchInURL(link) {
		if(!link) {
			return null;
		}
		const search = /\?([^#]*)/.exec(link);
		if(!search) {
			return null;
		}
		return search[1];
	}
    static getQueryVariable(paramName, location) {
        let vars = (LinkHelper.getSearchInURL(location) || domContext.location.search).substring(1).split('&');
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) == paramName) {
                return decodeURIComponent(pair[1]);
            }
        }
        return null;
    }
};

module.exports = {
    LinkHelper
}



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libHelper\\units\\objectHelper.js":
/*!*************************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\libHelper\units\objectHelper.js ***!
  \*************************************************************************************************/
/***/ ((module) => {

class ObjectHelper {
    static getPropertyName(object, propertyNameStart, resultOnce) {
        const objectNames = Object.getOwnPropertyNames(object);
        const resultList = objectNames.filter((propertyName) => propertyName.startsWith(propertyNameStart));
        if(resultOnce) {
            if(resultList.length) {
                return resultList[0];
            }
            return null;
        }
        return resultList;
    }

    static getProperty(object, propertyNameStart, resultOnce) {
        const objectNames = Object.getOwnPropertyNames(object);
        const resultList = objectNames
            .filter((propertyName) => propertyName.startsWith(propertyNameStart))
            .map((propertyName) => object[propertyName]);
        if(resultOnce) {
            if(resultList.length) {
                return resultList[0];
            }
            return null;
        }
        return resultList;
    }
};

module.exports = {
    ObjectHelper
};



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libHelper\\units\\stringHelper.js":
/*!*************************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\libHelper\units\stringHelper.js ***!
  \*************************************************************************************************/
/***/ ((module) => {

class FormatString {
    sourceString = null;

    constructor(sourceString) {
        this.sourceString = (sourceString || null);
    }

    formatValuePython(data) {
        return this.sourceString.replace(/{(\d+)}/g, ((match, number) => (typeof(data[number])) != 'undefined' ? data[number]: match));
    }

    formatValue(data) {
        return this.sourceString.replace(/%(\d+)/g, ((match, number) => (typeof(data[number])) != 'undefined' ? data[number]: match));
    }

    toString() {
        return this.sourceString;
    }
}

module.exports = {
    FormatString
};



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libWebpack\\entry-development.js":
/*!*************************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\libWebpack\entry-development.js ***!
  \*************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const moduleTemplate = __webpack_require__(/*! ./entry */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libWebpack\\entry.js");
const { forceDebugContext } = __webpack_require__(/*! ../../../../../src/utils/context */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\context.js");
const { debugName } = __webpack_require__(/*! ../../../../../config/debug */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\config\\debug.js");

moduleTemplate.constructors.unshift((moduleContext) => {
    forceDebugContext[debugName] = (forceDebugContext[debugName] || {});
    Object.defineProperty(forceDebugContext[debugName], moduleContext.id, {
        writable: false,
        value: moduleContext
    });
});
moduleTemplate.send();

module.exports = moduleTemplate;



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libWebpack\\entry.js":
/*!*************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\libWebpack\entry.js ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { moduleCreate } = __webpack_require__(/*! ../../../../../src/utils/module */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\module.js");

module.exports = moduleCreate('libWebpack', ((moduleContext, coreContext) => {
    // moduleContext.info.name = 'Lib Webpack';
    // moduleContext.info.version = '1.0.0';
    // moduleContext.info.versionAlpha = true;
    // moduleContext.info.versionBeta = false;

    moduleContext.units.register(__webpack_require__(/*! ./units/webpackModuleManager */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libWebpack\\units\\webpackModuleManager.js"));
    moduleContext.units.register(__webpack_require__(/*! ./units/advancedWebpackModuleManager */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libWebpack\\units\\advancedWebpackModuleManager.js"));
}));



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libWebpack\\units\\advancedWebpackModuleManager.js":
/*!******************************************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\libWebpack\units\advancedWebpackModuleManager.js ***!
  \******************************************************************************************************************/
/***/ ((module) => {

class AdvancedWebpackModuleManager {
    moduleManager = null;

    constructor() {
        this.moduleManager = null;
    }
    getExports(searchData, resultOnce) {
        const className = searchData.split('.').pop();
        this.moduleManager.webpackRequireList(this.searchMetadataClass(className));
        const searchResult = this.searchExports(searchData, resultOnce);
        if(resultOnce) {
            return searchResult;
        }
        const resultList = [];
        for (const moduleId in searchResult) {
            resultList.push(searchResult[moduleId]);
        }
        return resultList;
    }
    searchMetadataClass(searchClass, resultOnce) {
        return this.searchSource('simpleName:"' + searchClass + '"', resultOnce);
    }
    searchMetadataClassRegEx(searchClass, resultOnce) {
        return this.searchSourceRegEx(
            new RegExp('\\$metadata\\$={(?:kind:[^:]+,)?simpleName:"(?:' + (searchClass ? searchClass : '[^{}]+') + ')"(?:,interfaces:)?'), resultOnce
        );
    }
    searchSource(searchCode, resultOnce) {
        const availableModules = [];
        for (const moduleId in this.moduleManager.modules) {
            if (this.moduleManager.modules[moduleId].toString().indexOf(searchCode) != (-1)) {
                availableModules.push(moduleId);
            }
        }
        if (resultOnce) {
            return availableModules.shift();
        }
        return availableModules;
    }
    searchSourceRegEx(searchCodeRegEx, resultOnce) {
        const availableModules = [];
        for (const moduleId in this.moduleManager.modules) {
            if (searchCodeRegEx.test(this.moduleManager.modules[moduleId].toString())) {
                availableModules.push(moduleId);
            }
        }
        if (resultOnce) {
            return availableModules.shift();
        }
        return availableModules;
    }
    searchExports(searchData, resultOnce) {
        if (typeof(searchData) == "string") {
            searchData = searchData.split(".");
        }
        let availableModules = {};
        const searchDataRuntime = Array.from(searchData);
        let searchValue = null;

        for (const moduleId in this.moduleManager.installedModules) {
            if (this.moduleManager.installedModules[moduleId].exports === null) {
                continue;
            }
            if (
                typeof this.moduleManager.installedModules[moduleId].exports != "object" &&
                typeof this.moduleManager.installedModules[moduleId].exports != "function"
            ) {
                continue;
            }
            availableModules[moduleId] = this.moduleManager.installedModules[moduleId].exports;
        }
        while ((searchValue = searchDataRuntime.shift())) {
            const availableModulesNext = {};
            for (const moduleId in availableModules) {
                if (!Object.hasOwnProperty.call(availableModules[moduleId], searchValue)) {
                    continue;
                }
                if (typeof availableModules[moduleId][searchValue] === null) {
                    continue;
                }
                if (
                    (typeof availableModules[moduleId][searchValue] != "object") &&
                    (typeof availableModules[moduleId][searchValue] != "function")
                ) {
                    continue;
                }
                availableModulesNext[moduleId] = availableModules[moduleId][searchValue];
            }
            availableModules = availableModulesNext;
        }
        if (resultOnce) {
            for (const moduleId in availableModules) {
                return availableModules[moduleId];
            }
            return null;
        }
        return availableModules;
    }

    loadEntryModule(...args) {
        return this.moduleManager.loadEntryModule(...args);
    }
    webpackRequireList(...args) {
        return this.moduleManager.webpackRequireList(...args);
    }
}

module.exports = {
    AdvancedWebpackModuleManager
};



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libWebpack\\units\\webpackModuleManager.js":
/*!**********************************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\libWebpack\units\webpackModuleManager.js ***!
  \**********************************************************************************************************/
/***/ ((module) => {

/**
 * Мненджер webpack-модулей
 */
class WebpackModuleManager {
    installedModules = null;
    modules = null;

    constructor(modules) {
        this.modules = (modules || {});
        this.installedModules = [];
    }
};

/**
 * Мненджер webpack-модулей ES4
 */
class ES4WebpackModuleManager extends WebpackModuleManager {
    constructor(modules) {
        super(modules);

        const __nested_webpack_require_415__ = (function (moduleId) {
            if (this.installedModules[moduleId]) {
                return this.installedModules[moduleId].exports;
            }
            let module = this.installedModules[moduleId] = {
                id: moduleId,
                loaded: false,
                exports: {}
            };
            this.modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_415__);
            module.loaded = true;
            return module.exports;
        }).bind(this);

        __nested_webpack_require_415__.m = this.modules;
        __nested_webpack_require_415__.c = this.installedModules;

        this.harmonyExport = this.export = __nested_webpack_require_415__.d = (function (exports, name, getter) {
            if (!__nested_webpack_require_415__.o(exports, name)) {
                Object.defineProperty(exports, name, { enumerable: true, get: getter });
            }
        });

        __nested_webpack_require_415__.r = (function (exports) {
            if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            }
            Object.defineProperty(exports, '__esModule', { value: true });
        });

        __nested_webpack_require_415__.t = (function (value, mode) {
            if (mode & 1) value = __nested_webpack_require_415__(value);
            if (mode & 8) return value;
            if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
            let ns = Object.create(null);
            __nested_webpack_require_415__.r(ns);
            Object.defineProperty(ns, 'default', { enumerable: true, value: value });
            if (mode & 2 && typeof value != 'string') for (let key in value) __nested_webpack_require_415__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
            return ns;
        });

        this.getDefaultExport = __nested_webpack_require_415__.n = (function (module) {
            let getter = module && module.__esModule ?
                function getDefault() { return module['default']; } :
                function getModuleExports() { return module; };
            __nested_webpack_require_415__.d(getter, 'a', getter);
            return getter;
        });
        __nested_webpack_require_415__.o = (function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        });
        __nested_webpack_require_415__.p = "";
        __nested_webpack_require_415__.s = null;
        this.webpackRequire = this.__webpack_require__ = __nested_webpack_require_415__;
    }

    installModule(id, callback, init) {
        this.modules[id] = callback;
        if (init) {
            return this.webpackRequire(id);
        }
    }

    get __webpack_public_path__() {
        return this.__webpack_require__.p;
    }

    set __webpack_public_path__(value) {
        this.__webpack_require__.p = value;
    }

    get publicPath() {
        return this.__webpack_require__.p;
    }

    set publicPath(value) {
        this.__webpack_require__.p = value;
    }

    get __webpack_entry__() {
        return this.__webpack_require__.s;
    }

    set __webpack_entry__(value) {
        this.__webpack_require__.s = value;
    }

    get entry() {
        return this.__webpack_require__.s;
    }

    set entry(value) {
        this.__webpack_require__.s = value;
    }

    get entryModule() {
        return this.__webpack_require__.s;
    }

    set entryModule(value) {
        this.__webpack_require__.s = value;
    }

    loadEntryModule(entry) {
        if (entry) {
            this.__webpack_require__.s = entry;
        }
        if (this.__webpack_require__.s instanceof Array) {
            this.__webpack_require__.s.forEach((e) => {
                this.webpackRequire(e);
            });
        } else {
            this.webpackRequire(this.__webpack_require__.s);
        }
    }

    webpackRequireList(moduleIdList) {
        let result = {};
        moduleIdList.map((e) => { result[e] = this.__webpack_require__(e) });
        return result;
    }
};


/**
 * Мненджер webpack-модулей ES5
 */
class ES5WebpackModuleManager extends WebpackModuleManager {
    entries = null;

    constructor(modules) {
        super(modules);
        this.entries = []

        const __nested_webpack_require_4788__ = ((moduleId) => {
            if (typeof (this.installedModules[moduleId]) != 'undefined') {
                return this.installedModules[moduleId].exports;
            }
            const module = this.installedModules[moduleId] = {
                id: moduleId,
                loaded: false,
                exports: {}
            };
            this.modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_4788__);
            module.loaded = true;
            return module.exports;
        }).bind(this);
        __nested_webpack_require_4788__.n = ((t) => {
            let n = (t && t.__esModule) ? (() => t.default) : (() => t);
            __nested_webpack_require_4788__.d(n, { a: n });
            return n;
        });
        __nested_webpack_require_4788__.d = (t, n) => {
            for (const r in n) {
                if (!__nested_webpack_require_4788__.o(n, r)) {
                    continue;
                }
                if (__nested_webpack_require_4788__.o(t, r)) {
                    continue;
                }
                Object.defineProperty(t, r, {
                    enumerable: true,
                    get: n[r]
                });
            }
        };
        __nested_webpack_require_4788__.g = ((function () {
            if ("object" == typeof (globalThis)) {
                return globalThis;
            }
            try {
                return (this || new Function("return this")());
            } catch (t) {
                if ("object" == typeof (window)) {
                    return window;
                }
            }
        })());
        __nested_webpack_require_4788__.hmd = ((t) => {
            (t = Object.create(t)).children || (t.children = []);
            Object.defineProperty(t, "exports", {
                enumerable: true,
                set: (() => {
                    throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: " + t.id)
                })
            });
            return t;
        });
        __nested_webpack_require_4788__.o = ((t, n) => Object.prototype.hasOwnProperty.call(t, n));
        __nested_webpack_require_4788__.r = ((t) => {
            if (typeof (Symbol) != "undefined" && Symbol.toStringTag) {
                Object.defineProperty(t, Symbol.toStringTag, {
                    value: "Module"
                });
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
        });

        this.webpackRequire = this.__webpack_require__ = __nested_webpack_require_4788__;
    }

    installModule(id, callback, init) {
        this.modules[id] = callback;
        if (init) {
            return this.webpackRequire(id);
        }
    }

    get __webpack_public_path__() {
        return this.__webpack_require__.p;
    }

    set __webpack_public_path__(value) {
        this.__webpack_require__.p = value;
    }

    get publicPath() {
        return this.__webpack_require__.p;
    }

    set publicPath(value) {
        this.__webpack_require__.p = value;
    }

    get __webpack_entry__() {
        return this.entries;
    }

    set __webpack_entry__(value) {
        this.entries = value;
    }

    get entry() {
        return this.entries;
    }

    set entry(value) {
        this.entries = value;
    }

    get entryModule() {
        return this.entries;
    }

    set entryModule(value) {
        this.entries = value;
    }

    loadEntryModule(entries) {
        this.entries = entries || this.entries || [];
        if (!(this.entries instanceof Array)) {
            this.entries = [this.entries];
        }
        this.entries.forEach((e) => {
            this.webpackRequire(e);
        });
    }

    webpackRequireList(moduleIdList) {
        let result = {};
        moduleIdList.map((e) => { result[e] = this.__webpack_require__(e) });
        return result;
    }
};

module.exports = {
    WebpackModuleManager,
    ES4WebpackModuleManager,
    ES5WebpackModuleManager,
    moduleCompareTable: {
        'es4': ES4WebpackModuleManager,
        'es5': ES5WebpackModuleManager
    }
};



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineHooks\\entry-development.js":
/*!*******************************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\tankionlineHooks\entry-development.js ***!
  \*******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const moduleTemplate = __webpack_require__(/*! ./entry */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineHooks\\entry.js");
const { forceDebugContext } = __webpack_require__(/*! ../../../../../src/utils/context */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\context.js");
const { debugName } = __webpack_require__(/*! ../../../../../config/debug */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\config\\debug.js");

moduleTemplate.constructors.unshift((moduleContext) => {
    forceDebugContext[debugName] = (forceDebugContext[debugName] || {});
    Object.defineProperty(forceDebugContext[debugName], moduleContext.id, {
        writable: false,
        value: moduleContext
    });
});
moduleTemplate.send();

module.exports = moduleTemplate;



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineHooks\\entry.js":
/*!*******************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\tankionlineHooks\entry.js ***!
  \*******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { moduleCreate, defaultModuleCreateSignals } = __webpack_require__(/*! ../../../../../src/utils/module */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\module.js");

module.exports = moduleCreate('tankionlineHooks', ((moduleContext, coreContext) => {
    // moduleContext.info.name = 'Tanki Online: Hooks';
    // moduleContext.info.version = '1.0.0';
    // moduleContext.info.versionAlpha = true;
    // moduleContext.info.versionBeta = false;
    
    moduleContext.units.register(__webpack_require__(/*! ./units/hookManager */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineHooks\\units\\hookManager.js"));
    moduleContext.units.register(__webpack_require__(/*! ./units/hooks/battleMessagesHook */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineHooks\\units\\hooks\\battleMessagesHook.js"));
    moduleContext.units.register(__webpack_require__(/*! ./units/hooks/fastOpenContainerHook */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineHooks\\units\\hooks\\fastOpenContainerHook.js"));
}), defaultModuleCreateSignals);



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineHooks\\units\\hookManager.js":
/*!*******************************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\tankionlineHooks\units\hookManager.js ***!
  \*******************************************************************************************************/
/***/ ((module) => {

class TankiOnlineHook {
    id = null;
    params = null;
    isSupportEnabled = null;
    isEnabled = null;
    isInjected = null;
    webpackData = null;
    coreContext = null;
    moduleContext = null;

    constructor(id, options) {
        this.id = id;
        this.isSupportEnabled = false;
        this.isEnabled = true;
        this.isInjected = false;
        this.webpackData = null;
        this.coreContext = null;
        this.moduleContext = null;
        if ((typeof (options) != 'object') || (options === null)) {
            options = {};
        }
        Object.assign(this.params = {}, options);
    }
    enable() {
        if(!this.isSupportEnabled) {
            return;
        }
        if (this.isEnabled) {
            return;
        }
        if(this.isInjected) {
            this.processEnable();
        }
        this.isEnabled = true;
    }
    disable() {
        if(!this.isSupportEnabled) {
            return;
        }
        if (!this.isEnabled) {
            return;
        }
        if(this.isInjected) {
            this.processDisable();
        }
        this.isEnabled = false;
    }
    inject(webpackData) {
        this.webpackData = webpackData;
        this.processInject();
        this.isInjected = true;
    }
    processInject() {
        /* Вызов при регистрации хука */
    }
    processEnable() {
        /* Вызов при включении хука */
    }
    processDisable() {
        /* Вызов при выключении хука */
    }
};
class TankiOnlineHookManager {
    hooks = null;
    coreContext = null;

    constructor(coreContext) {
        this.hooks = {};
        this.coreContext = coreContext;
    }

    register(hook, moduleContext) {
        if(hook.id in this.hooks) {
            return;
        }
        this.hooks[hook.id] = hook;
        hook.coreContext = this.coreContext;
        hook.moduleContext = moduleContext;
    }

    launch(webpackData) {
        for(const hookId in this.hooks) {
            this.hooks[hookId].inject(webpackData);
        }
    }
};

const unitSignals = {
    init: ((moduleContext, coreContext) => {
        moduleContext.hooks = new TankiOnlineHookManager(coreContext);
    }),
    event: ((moduleContext, coreContext) => {
        coreContext.event.addEventListener("tankionlineLoader.entry.launch", ((event) => {
            moduleContext.hooks.launch(coreContext.modules.require('tankionlineWebpack').webpackData);
        }));
    })
};

module.exports = {
    unitSignals,
    TankiOnlineHook,
    TankiOnlineHookManager
};



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineHooks\\units\\hooks\\battleMessagesHook.js":
/*!********************************************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\tankionlineHooks\units\hooks\battleMessagesHook.js ***!
  \********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { TankiOnlineHook } = __webpack_require__(/*! ./../hookManager */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineHooks\\units\\hookManager.js");

class TankiOnlineHookBattleMessages extends TankiOnlineHook {
    constructor(defaultEnabled, options) {
        super('BattleMessages', options);

        this.isSupportEnabled = true;
        this.isEnabled = defaultEnabled;
    }
    processInject() {
        const hookInfo = this;

        const libHelper = hookInfo.coreContext.modules.require("libHelper");

        const getExportObject = ((objectPath, ...args) => {
            const exportData = this.webpackData.getExports(objectPath, ...args);
            if((typeof(exportData) == 'undefined') || (exportData === null)) {
                hookInfo.moduleContext.logger.error("Can't get object: \"%s\"", objectPath);
            }
            return exportData;
        })

        const CaptureFlagComponent = getExportObject('tanks.client.battle.objects.modes.ctf.component.CaptureFlagComponent', true);
        if(!CaptureFlagComponent) { return; }

        const BattleTeam = getExportObject('projects.tanks.multiplatform.battleservice.model.battle.team.BattleTeam', true);
        if(!BattleTeam) { return; }

        const TeamRelation = getExportObject('tanks.client.lobby.redux.battle.hud.TeamRelation', true);
        if(!TeamRelation) { return; }

        const BattleMessageType = getExportObject('tanks.client.lobby.redux.battle.hud.BattleMessageType', true);
        if(!BattleMessageType) { return; }

        const BattleMessagesComponent = getExportObject('tanks.client.battle.hud.BattleMessagesComponent', true);
        if(!BattleMessagesComponent) { return; }

        const LocalizedComponent = getExportObject('com.alternativaplatform.redux.react.LocalizedComponent', true);
        if(!LocalizedComponent) { return; }

        /**
         * Сообщения для событий
         */
        const getEventData = (() => (hookInfo.params.notifyMessages));

        // Патч локализации
        const getLocalizedKeyByBattleMessage = BattleMessagesComponent.prototype.getLocalizedKeyByBattleMessage_0;
        BattleMessagesComponent.prototype.getLocalizedKeyByBattleMessage_0 = (function (battleMessage, ...args) {
            if (battleMessage instanceof libHelper.FormatString) {
                return battleMessage;
            }
            return getLocalizedKeyByBattleMessage.call(this, battleMessage, ...args);
        });

        // Патч локализации
        const getTextPropertyNameList = libHelper.ObjectHelper.getPropertyName(LocalizedComponent.prototype, 'getText_');
        getTextPropertyNameList.map((propertyName) => {
            let originalFunciton = LocalizedComponent.prototype[propertyName];
            LocalizedComponent.prototype[propertyName] = (function (...args) {
                if ((!args.length) || !(args[0] instanceof libHelper.FormatString)) {
                    return originalFunciton.apply(this, args);
                }
                return (args[0]).formatValue(args.slice(1));
            });
        });

        // Изучение сообщений
        libHelper.FunctionHelper.pathFunctionSimpleBefore(
            CaptureFlagComponent.prototype,
            libHelper.ObjectHelper.getPropertyName(CaptureFlagComponent.prototype, 'notifyFlagFacedOff', true),
            (function (...args) {
                hookInfo.moduleContext.logger.info("CaptureFlagComponent.prototype.notifyFlagFacedOff(%O, %O)", this, args);
            })
        );

        // Изучение сообщений
        libHelper.FunctionHelper.pathFunctionSimpleBefore(
            CaptureFlagComponent.prototype,
            libHelper.ObjectHelper.getPropertyName(CaptureFlagComponent.prototype, 'notifyFlagExiled', true),
            (function (...args) {
                hookInfo.moduleContext.logger.info("CaptureFlagComponent.prototype.notifyFlagExiled(%O, %O)", this, args);
            })
        );

        // Изучение сообщений
        libHelper.FunctionHelper.pathFunctionSimpleBefore(
            CaptureFlagComponent.prototype,
            libHelper.ObjectHelper.getPropertyName(CaptureFlagComponent.prototype, 'notifyReadyToFaceOff', true),
            (function (...args) {
                hookInfo.moduleContext.logger.info("CaptureFlagComponent.prototype.notifyReadyToFaceOff(%O, %O)", this, args);
            })
        );

        const getTypePropertyName = libHelper.ObjectHelper.getPropertyName(BattleMessageType.Companion.__proto__, 'getType', true);
        for (const eventName in getEventData()) {
            libHelper.FunctionHelper.pathFunctionSimpleBefore(
                CaptureFlagComponent.prototype,
                libHelper.ObjectHelper.getPropertyName(CaptureFlagComponent.prototype, eventName, true),
                (function (flagObject, battleEntityObject) {
                    if (!hookInfo.isEnabled) {
                        return;
                    }
                    hookInfo.moduleContext.logger.info("CaptureFlagComponent.prototype." + eventName + "(flagOwner: %O, playerTeam: %O)", this, flagObject.teamType.name, this.gameMode_0.possesedTankTeam.name);
                    function teamCompare(teamFirst, teamSecond) {
                        return ((teamFirst === teamSecond) && (teamFirst !== BattleTeam.NONE));
                    }
                    function getTeamRelationEx(teamFirst, teamSecond, isAlly) {
                        return ((isAlly == teamCompare(teamFirst, teamSecond)) ? TeamRelation.ALLY : TeamRelation.ENEMY);
                    }
                    function getTeamRelation(gameMode, flagTeamOwner, isAlly) {
                        if (gameMode && gameMode.possesedTankTeam) {
                            return getTeamRelationEx(gameMode.possesedTankTeam, flagTeamOwner, isAlly)
                        }
                        return null;
                    }
                    const teamRelation = getTeamRelation(this.gameMode_0, flagObject.teamType, false);
                    if (battleEntityObject) {
                        this.addBattleLogMessage_0(
                            getEventData()[eventName].playerMessage,
                            battleEntityObject, (
                            (teamRelation !== null)
                                ? BattleMessageType.Companion[getTypePropertyName].call(BattleMessageType.Companion, teamRelation, false)
                                : BattleMessageType.WHITE
                        )
                        );
                    } else {
                        this.addBattleLogMessage_1(
                            getEventData()[eventName].defaultMessage, (
                            (teamRelation !== null)
                                ? BattleMessageType.Companion[getTypePropertyName].call(BattleMessageType.Companion, teamRelation, false)
                                : BattleMessageType.WHITE
                        )
                        );
                    }

                })
            );
        }
    }
}

const unitSignals = {
    load: ((moduleContext, coreContext) => {
        const defaultEnabled = true;

        const libHelper = coreContext.modules.require("libHelper");

        moduleContext.hooks.register(new TankiOnlineHookBattleMessages(defaultEnabled, {
            notifyMessages: {
                notifyFlagDropped: {
                    playerMessage: new libHelper.FormatString("%0 потерял флаг"),
                    defaultMessage: new libHelper.FormatString("Флаг потерян") // TODO: Такое бывает?
                },
                notifyFlagReturned: {
                    playerMessage: new libHelper.FormatString("%0 возвратил флаг"),
                    defaultMessage: new libHelper.FormatString("Флаг возвращен")
                }
            }
        }), moduleContext);
    })
};

module.exports = {
    unitSignals,
    TankiOnlineHookBattleMessages
};



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineHooks\\units\\hooks\\fastOpenContainerHook.js":
/*!***********************************************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\tankionlineHooks\units\hooks\fastOpenContainerHook.js ***!
  \***********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { TankiOnlineHook } = __webpack_require__(/*! ./../hookManager */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineHooks\\units\\hookManager.js");

class TankiOnlineHookFastOpenContainer extends TankiOnlineHook {
    constructor(defaultEnabled, options) {
        super('FastOpenContainer', options);

        this.isSupportEnabled = true;
        this.isEnabled = defaultEnabled;
    }
    processInject() {
        const hookInfo = this;

        const getExportObject = ((objectPath, ...args) => {
            const exportData = this.webpackData.getExports(objectPath, ...args);
            if((typeof(exportData) == 'undefined') || (exportData === null)) {
                hookInfo.moduleContext.logger.error("Can't get object: \"%s\"", objectPath);
            }
            return exportData;
        })

        const AnimationOpenContainerComponent = getExportObject('tanks.clients.html5.lobby.containers.AnimationOpenContainerComponent', true);

        if(!AnimationOpenContainerComponent) { return; }

        /**
         * Переменная скорости открытия контейнеров
         */
        hookInfo.params.openContainerSpeed = 1;
        /**
         * Функция открытия контейнера, вызывается при включенном хуке
         */
        hookInfo.params.functionAcceleratePath = (function (...args) {
            return hookInfo.params.openContainerSpeed;
        });
        /**
         * Оригинальная функция открытия контейнера
         */
        hookInfo.params.functionAccelerateDefault = AnimationOpenContainerComponent.prototype.accelerate_0;

        /**
         * В зависимости от состояния патча, вызывается либо оригинальная функция, либо патченная
         */
        AnimationOpenContainerComponent.prototype.accelerate_0 = (function (...args) {
            if(hookInfo.isEnabled) {
                return hookInfo.params.functionAcceleratePath.apply(this, args);
            } else {
                return hookInfo.params.functionAccelerateDefault.apply(this, args);
            }
        });
    }
}

const unitSignals = {
    load: ((moduleContext, coreContext) => {
        const defaultEnabled = false;

		moduleContext.hooks.register(new TankiOnlineHookFastOpenContainer(defaultEnabled), moduleContext);
    })
};

module.exports = {
    unitSignals,
    TankiOnlineHookFastOpenContainer
};



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineLoader\\config.js":
/*!*********************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\tankionlineLoader\config.js ***!
  \*********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { domContext } = __webpack_require__(/*! ../../../../../src/utils/context */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\context.js");

const baseGamePage = 'https://tankionline.com/play/';

const mutatePage = ((linkGamePage, linkCurrent) => {
    let currentRegExp;
    if(currentRegExp = /^([^\/]+?:\/\/[^\/]+)\/hook(\/.*)$/.exec(linkCurrent)) {
        return currentRegExp[1] + currentRegExp[2];
    }
    if(currentRegExp = /^([^\/]+?:\/\/[^\/]+\/.*\/)hook\/?$/.exec(linkCurrent)) {
        return currentRegExp[1];
    }
    return linkGamePage;
});

const getGameInfo = (() => {
    const gameInfo = {
        linkGamePage: baseGamePage,
        linkReferer: baseGamePage
    };
    
    let baseURL = new URL(domContext.location.href);

    if(/^(?:.+\.)?tankionline\.com$/.test(baseURL.host)) {
        if(/^\/(?:play|browser-(?:public|private))\//.test(baseURL.pathname)) {
            gameInfo.linkGamePage = baseURL.toString();
            gameInfo.linkReferer = baseURL.toString();
        }
    }

    return gameInfo;
});

module.exports = {
    paramOriginalScript: 'forceScript',
    paramOriginalPage: 'forcePage',
    mutatePage,
    mutateScript: ((linkScript, linkGamePage, linkCurrent) => linkScript),
    getGameInfo,
    getPageContentRewriteStatus: (() => true),
    getBaseRewriteStatus: (() => true),
};



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineLoader\\entry-development.js":
/*!********************************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\tankionlineLoader\entry-development.js ***!
  \********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const moduleTemplate = __webpack_require__(/*! ./entry */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineLoader\\entry.js");
const { forceDebugContext } = __webpack_require__(/*! ../../../../../src/utils/context */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\context.js");
const { debugName } = __webpack_require__(/*! ../../../../../config/debug */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\config\\debug.js");

moduleTemplate.constructors.unshift((moduleContext) => {
    forceDebugContext[debugName] = (forceDebugContext[debugName] || {});
    Object.defineProperty(forceDebugContext[debugName], moduleContext.id, {
        writable: false,
        value: moduleContext
    });
});
moduleTemplate.send();

module.exports = moduleTemplate;



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineLoader\\entry.js":
/*!********************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\tankionlineLoader\entry.js ***!
  \********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { moduleCreate, defaultModuleCreateSignals } = __webpack_require__(/*! ../../../../../src/utils/module */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\module.js");

module.exports = moduleCreate('tankionlineLoader', ((moduleContext, coreContext) => {
    // moduleContext.info.name = 'Tanki Online: Loader';
    // moduleContext.info.version = '1.0.0';
    // moduleContext.info.versionAlpha = true;
    // moduleContext.info.versionBeta = false;
    
    moduleContext.units.register(__webpack_require__(/*! ./units/gameLoader */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineLoader\\units\\gameLoader.js"));
    moduleContext.units.register(__webpack_require__(/*! ./units/gameScriptLoader */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineLoader\\units\\gameScriptLoader.js"));
}), defaultModuleCreateSignals);



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineLoader\\units\\gameLoader.js":
/*!*******************************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\tankionlineLoader\units\gameLoader.js ***!
  \*******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { getDocument } = __webpack_require__(/*! ../../../../../src/utils/context */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\context.js");
const { getPageContentRewriteStatus, getBaseRewriteStatus } = __webpack_require__(/*! ./../config */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineLoader\\config.js");

const unitSignals = {
    init: ((moduleContext, coreContext) => {
        moduleContext.libHelper = null;

        moduleContext.webpackData = null;
        moduleContext.webpackSource = null;
    }),
    moduleLoad: (async (moduleContext, coreContext) => {
        moduleContext.libHelper = coreContext.modules.require('libHelper');
        let libTankionlineWebpack = coreContext.modules.require('tankionlineWebpack');

        moduleContext.webpackData = libTankionlineWebpack.webpackData;
        moduleContext.webpackSource = libTankionlineWebpack.webpackSource;

        await moduleContext.ScriptLoader.getMainScriptContentAuto(moduleContext.webpackSource, moduleContext.libHelper);
    }),
    moduleApplication: ((moduleContext, coreContext) => {
        const libWebpack = coreContext.modules.require('libWebpack');

        if (!moduleContext.webpackSource.mainScriptWebpackElements || !moduleContext.webpackSource.mainScriptWebpackPath || !moduleContext.webpackSource.mainScriptWebpackEntry) {
            moduleContext.logger.error('Fail: webpackSource is corrupted: %O', moduleContext.webpackSource);
            return;
        }
        const document = getDocument();
        if (getPageContentRewriteStatus() && moduleContext.webpackSource.pageContent) {
            if (coreContext.event.dispatchEvent(new coreContext.ModuleEvent(moduleContext, "htmlRewrite.fullDocument", { cancelable: true }))) {
                document.firstChild.innerHTML = moduleContext.webpackSource.pageContent;
            }
        }
        if (getBaseRewriteStatus() && moduleContext.webpackSource.linkBase) {
            if (coreContext.event.dispatchEvent(new coreContext.ModuleEvent(moduleContext, "htmlRewrite.headBase", { cancelable: true }))) {
                Array.from(document.getElementsByTagName('base')).map((element) => element.remove());
                let headElement = document.head;
                if (!headElement) {
                    let headList = document.getElementsByTagName('head');
                    if (headList.length) {
                        headElement = headList[0];
                    } else {
                        moduleContext.logger.warn('DOM base element load error: document.head');
                    }
                }
                if (headElement) {
                    let insertElement = document.createElement('base');
                    insertElement.setAttribute('href', moduleContext.webpackSource.linkBase);
                    headElement.insertBefore(insertElement, (headElement.firstChild || null));
                }
            }
        }

        if (coreContext.event.dispatchEvent(new coreContext.ModuleEvent(moduleContext, "dataLoad", { cancelable: true }))) {
            if (moduleContext.webpackSource.mainScriptWebpackModuleManager) {
                moduleContext.webpackData.moduleManager = new (libWebpack.moduleCompareTable[moduleContext.webpackSource.mainScriptWebpackModuleManager])();
            }
            moduleContext.webpackData.moduleManager.modules = eval('(()=>(' + moduleContext.webpackSource.mainScriptWebpackElements + '))()');
            moduleContext.webpackData.moduleManager.publicPath = moduleContext.webpackSource.mainScriptWebpackPath;
            moduleContext.webpackData.moduleManager.entryModule = moduleContext.webpackSource.mainScriptWebpackEntry;
        }

        if (moduleContext.webpackData.moduleManager.modules) {
            coreContext.event.dispatchEvent(new coreContext.ModuleEvent(moduleContext, "dataLoaded", {
                cancelable: false, detail: {
                    webpackData: moduleContext.webpackData
                }
            }));

            if (coreContext.event.dispatchEvent(new coreContext.ModuleEvent(moduleContext, "entry.launch", {
                cancelable: true, detail: {
                    webpackData: moduleContext.webpackData
                }
            }))) {
                const result = moduleContext.webpackData.moduleManager.loadEntryModule();
                coreContext.event.dispatchEvent(new coreContext.ModuleEvent(moduleContext, "entry.launched", {
                    cancelable: false, detail: {
                        returnValue: result
                    }
                }));
            }
        }
    })
};

module.exports = {
    unitSignals
};



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineLoader\\units\\gameScriptLoader.js":
/*!*************************************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\tankionlineLoader\units\gameScriptLoader.js ***!
  \*************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { paramOriginalScript, paramOriginalPage, mutatePage, mutateScript, getGameInfo } = __webpack_require__(/*! ./../config */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineLoader\\config.js");
const { getDocument, domContext } = __webpack_require__(/*! ../../../../../src/utils/context */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\context.js");

class NetworkUtils {
    static async getContent(linkPage, linkReferer) {
        let response = await fetch(linkPage, {
            referrer: linkReferer,
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            method: "GET",
            mode: "cors",
            credentials: "omit"
        });
        if (response.status !== 200) {
            return null;
        }
        let pageContent = await response.text();
        if (!pageContent) {
            return null;
        }
        return pageContent;
    }
};
class GameInfoCollector {
    libHelper = null;
    linkGamePage = null;
    linkReferer = null;

    constructor(libHelper, linkGamePage, linkReferer) {
        this.libHelper = libHelper;
        this.linkGamePage = linkGamePage;
        this.linkReferer = linkReferer;
    }

    getGamePage() {
        const forceGamePage = this.libHelper.LinkHelper.getQueryVariable(paramOriginalPage);
        if (forceGamePage) {
            return forceGamePage;
        }
        if (this.linkGamePage) {
            return mutatePage(this.linkGamePage, domContext.location.href);
        }
        return null;
    }
    processGameScript(script) {
        if (!script) {
            return null;
        }
        const scriptURL = new URL(script);
        if (/\.js$/.test(scriptURL.pathname)) {
            if (!scriptURL.search.length) {
                scriptURL.search = '?';
            }
        }
        return scriptURL.toString();
    }
    getGameScript(gameScript) {
        const forceGameScript = this.libHelper.LinkHelper.getQueryVariable(paramOriginalScript);
        if (forceGameScript) {
            return this.processGameScript(forceGameScript);
        }
        if (gameScript) {
            return this.processGameScript(mutateScript(gameScript, this.getGamePage(), domContext.location.href));
        }
        return null;
    }

    getGameInfo() {
        return null;
    }
};
class ParamGameInfoCollector extends GameInfoCollector {
    getGameInfo() {
        const originalScript = this.getGameScript();
        if (!originalScript) {
            return null;
        }
        return {
            linkScript: this.libHelper.LinkHelper.linkAbsolute(originalScript, this.getGamePage()),
            linkBase: this.libHelper.LinkHelper.getBase(this.getGamePage())
        };
    }
};
class DocumentGameInfoCollector extends GameInfoCollector {
    getGameInfo() {
        let scriptElement = getDocument().querySelector(
            'script[src*="main."][src*=".js"][src^="/"]:not([src^="//"])'
        );
        if (!scriptElement) {
            return null;
        }
        return {
            linkScript: this.getGameScript(this.libHelper.LinkHelper.linkAbsolute(scriptElement.getAttribute("src"), this.linkGamePage)),
            linkBase: this.libHelper.LinkHelper.getBase(this.getGamePage()),
            scriptLoaded: true
        };
    }
};
class SourceGameInfoCollector extends GameInfoCollector {
    async getGameInfo() {
        const pageContent = await NetworkUtils.getContent(this.getGamePage(), this.linkReferer);
        if (!pageContent) {
            return;
        }
        const contentQuery = /<script[^>]+src="([^">]+main.[0-9a-f]{8}.js)"[^>]*><\/script>/i.exec(pageContent);
        if (!contentQuery) {
            return null;
        }
        return {
            linkScript: this.getGameScript(this.libHelper.LinkHelper.linkAbsolute(contentQuery[1], this.getGamePage())),
            linkBase: this.libHelper.LinkHelper.getBase(this.getGamePage()),
            pageContent: pageContent.replace(/<script[^>]+src="[^">]+"[^>]*><\/script>/i, '')
        };
    }
};
class ScriptLoader {
    static parseMainScript(scriptContent) {
        if (!scriptContent) {
            return null;
        }
        const searchOptions = [
            ((scriptContent) => {
                const webpackInfo = /}\((\[function\(t,e,n\){.*\])[^\]]+/.exec(scriptContent);
                if(!webpackInfo) {
                    return null;
                }
                const searchPublic = /,n\.p="(.*)",n\(n\.s=(\d+)\)/.exec(scriptContent);
                if (!searchPublic) {
                    return null;
                }
                return {
                    mainScriptWebpackElements: webpackInfo[1],
                    mainScriptWebpackPath: searchPublic[1],
                    mainScriptWebpackEntry: [parseInt(searchPublic[2])],
                    mainScriptWebpackModuleManager: 'es4'
                };
            }), ((scriptContent) => {
                const webpackInfo = /\(this,\(\(\)=>\(\(\)=>{var[ \t]+[^=\(\)]{1,4}=({.*}),n={};function[ \t]+[^=\(\)]{1,4}\([^=\(\)]{1,4}\)[\s\S]{0,8192}$/.exec(scriptContent);
                if(!webpackInfo) {
                    return null;
                }
                const searchPublic = /,i.p="(.*)"((?:,i\(\d+\))+)[\s\S]{0,512}$/.exec(scriptContent);
                if (!searchPublic) {
                    return null;
                }
                const webpackEntries = [];
                let searchEntry = null;
                const searchEntries = /i\((\d+)\)/g;
                while (searchEntry = searchEntries.exec(searchPublic[2])) {
                    webpackEntries.push(parseInt(searchEntry[1]));
                }
                return {
                    mainScriptWebpackElements: webpackInfo[1],
                    mainScriptWebpackPath: searchPublic[1],
                    mainScriptWebpackEntry: webpackEntries,
                    mainScriptWebpackModuleManager: 'es5'
                };
            })
        ];
        for(let index = 0; index < searchOptions.length; index++) {
            const sourceData = searchOptions[index](scriptContent);
            if(sourceData) {
                return sourceData;
            }
        }
        return null;
    }
    static async getMainScriptContentAuto(webpackSource, libHelper) {
        const { linkGamePage, linkReferer } = getGameInfo();
        const methodsAvailable = [
            // Сначала ищем информацию на странице
            new DocumentGameInfoCollector(libHelper, linkGamePage, linkReferer),
            // Затем пытаемся извлечь из параметров
            new ParamGameInfoCollector(libHelper, linkGamePage, linkReferer),
            // Потом получаем их из значений по умолчанию
            new SourceGameInfoCollector(libHelper, linkGamePage, linkReferer)
        ];
        let methodResult;
        let scriptInfo = null;

        for (let methodId = 0; methodId < methodsAvailable.length; methodId++) {
            methodResult = methodsAvailable[methodId].getGameInfo();
            if (methodResult instanceof Promise) {
                methodResult = await methodResult;
            }
            if (!methodResult || !methodResult.linkScript || methodResult.scriptLoaded) {
                continue;
            }
            scriptInfo = methodResult;
            break;
        }
        if (!scriptInfo) {
            return;
        }
        const scriptData = ScriptLoader.parseMainScript(await NetworkUtils.getContent(scriptInfo.linkScript, linkReferer));
        if (scriptData) {
            Object.assign(scriptInfo, scriptData);
        }
        Object.assign(webpackSource, scriptInfo);
    }
};

module.exports = {
    ScriptLoader
}

/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineWebpack\\entry-development.js":
/*!*********************************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\tankionlineWebpack\entry-development.js ***!
  \*********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const moduleTemplate = __webpack_require__(/*! ./entry */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineWebpack\\entry.js");
const { forceDebugContext } = __webpack_require__(/*! ../../../../../src/utils/context */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\context.js");
const { debugName } = __webpack_require__(/*! ../../../../../config/debug */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\config\\debug.js");

moduleTemplate.constructors.unshift((moduleContext) => {
    forceDebugContext[debugName] = (forceDebugContext[debugName] || {});
    Object.defineProperty(forceDebugContext[debugName], moduleContext.id, {
        writable: false,
        value: moduleContext
    });
});
moduleTemplate.send();

module.exports = moduleTemplate;



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineWebpack\\entry.js":
/*!*********************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\tankionlineWebpack\entry.js ***!
  \*********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { moduleCreate, defaultModuleCreateSignals } = __webpack_require__(/*! ../../../../../src/utils/module */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\module.js");

module.exports = moduleCreate('tankionlineWebpack', ((moduleContext, coreContext) => {
    // moduleContext.info.name = 'Tanki Online: Webpack';
    // moduleContext.info.version = '1.0.0';
    // moduleContext.info.versionAlpha = true;
    // moduleContext.info.versionBeta = false;
    
    moduleContext.units.register(__webpack_require__(/*! ./units/webpackStorage */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineWebpack\\units\\webpackStorage.js"));
}), defaultModuleCreateSignals);



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineWebpack\\units\\webpackStorage.js":
/*!************************************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\modules\tankionlineWebpack\units\webpackStorage.js ***!
  \************************************************************************************************************/
/***/ ((module) => {

const unitSignals = {
    moduleInit: ((moduleContext, coreContext) => {
        let libWebpackModule = coreContext.modules.require('libWebpack');
        
        moduleContext.webpackData = new libWebpackModule.AdvancedWebpackModuleManager();
		moduleContext.webpackSource = {};
    })
};

module.exports = {
    unitSignals
};



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\context.js":
/*!**************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\utils\context.js ***!
  \**************************************************************************/
/***/ ((module) => {

const localGlobalContext = (() => {
    try {
        return globalContext;
    } catch(e) {};
    return globalThis;
})();

const localPackageContext = (() => {
    try {
        return packageContext;
    } catch(e) {};
    return {};
})();
const localRuntimeContext = (() => {
    try {
        return runtimeContext;
    } catch(e) {};
    return {};
})();
const localConnectContext = (() => {
    try {
        return connectContext;
    } catch(e) {};
    return (localRuntimeContext || localPackageContext || localGlobalContext);
})();
const localDOMContext = (() => {
    try {
        return domContext;
    } catch(e) {};
    return localGlobalContext;
})();

const getDebugContext = ((force) => {
    try {
        return debugContext;
    } catch(e) {};
    return (force ? localGlobalContext : {});
});
const getValue = ((name) => {
    if(name in localRuntimeContext) {
        return localRuntimeContext[name];
    }
    if(name in localPackageContext) {
        return localPackageContext[name];
    }
    if(name in localGlobalContext) {
        return localGlobalContext[name];
    }
    if(name in globalThis) {
        return globalThis[name];
    }
});
const getDocument = (() => {
    return localDOMContext.document;
});
const getInterpreterType = (() => {
    if(globalThis.constructor && globalThis.constructor.name) {
        if(globalThis.constructor.name.toLowerCase() == 'window') {
            return 'Browser';
        }
    }
    if(globalThis instanceof EventTarget) {
        return 'Browser';
    }
    if(globalThis.navigator && globalThis.navigator.userAgent) {
        return 'Browser';
    }
    if(globalThis.navigator && globalThis.navigator.cookieEnabled) {
        return 'Browser';
    }
    if(globalThis.performance && globalThis.performance.nodeTiming) {
        return 'NodeJS';
    }
    return 'Unknown';
});

module.exports = {
    globalContext: localGlobalContext,
    packageContext: localPackageContext,
    runtimeContext: localRuntimeContext,
    connectContext: localConnectContext,
    domContext: localDOMContext,
    
    consoleContext: getValue('console'),

    forceDebugContext: getDebugContext(true),
    debugContext: getDebugContext(false),
    getDocument,
    getValue,
    getInterpreterType
};


/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\features.js":
/*!***************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\utils\features.js ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {
    sharedCore: {
        enabled: true,
        coreContext: null,
        templateList: []
    }
};



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\module.js":
/*!*************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\src\utils\module.js ***!
  \*************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { connectContext } = __webpack_require__(/*! ./context */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\context.js");
const { moduleListenerName } = __webpack_require__(/*! ../../../../../config/moduleConnection */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\config\\moduleConnection.js");
const { sharedCore } = __webpack_require__(/*! ./features */ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\utils\\features.js");

class ListenerRegisterEvent extends Event {
    status = null;
    transferObject = null;
    constructor(eventType) {
        super(eventType)
        this.status = false;
        this.transferObject = null;
    }
};
class ListenerRegisterModuleTemplateEvent extends ListenerRegisterEvent {
    moduleTemplate = null;
    constructor(eventType, moduleTemplate) {
        super(eventType)
        this.transferObject = this.moduleTemplate = moduleTemplate;
    }
};

const moduleSendEvent = ((shareContext, shareKey, moduleTemplate) => {
    let registerEvent = new ListenerRegisterModuleTemplateEvent(shareKey, moduleTemplate);
    shareContext.dispatchEvent(registerEvent);

    let registerEventFunction = ((event) => {
        let registerCallback = (event.registerCallback || null);
        if(!registerCallback || (typeof(registerCallback) != 'function')) {
            return;
        }
        shareContext.removeEventListener((shareKey + 'ModuleRequest'), registerEventFunction);
        registerCallback(moduleTemplate);
    });
    
    if(!registerEvent.status) {
        shareContext.addEventListener((shareKey + 'ModuleRequest'), registerEventFunction);
    }
});
const moduleSendContext = ((shareContext, shareKey, moduleTemplate) => {
    shareContext[shareKey] = (shareContext[shareKey] || []);

    if ((shareContext[shareKey]) instanceof Array) {
        shareContext[shareKey].push(moduleTemplate);
    } else {
        shareContext[shareKey](moduleTemplate);
    }
});

const moduleSendDirect = ((moduleTemplate) => {
    if(sharedCore.coreContext) {
        sharedCore.coreContext.moduleListener.installModuleTemplate(moduleTemplate);
    } else {
        sharedCore.templateList.push(moduleTemplate);
    }
});

const moduleSend = ((shareContext, shareKey, moduleTemplate) => {
    if(sharedCore.enabled) {
        moduleSendDirect(moduleTemplate);
    } else if(shareContext instanceof EventTarget) {
        moduleSendEvent(shareContext, shareKey, moduleTemplate);
    } else {
        moduleSendContext(shareContext, shareKey, moduleTemplate);
    }
});

const moduleCreate = ((moduleId, ...args) => {
    let moduleTemplate = {
        id: moduleId,
        constructors: args,
        send: (() => (moduleSend(connectContext, moduleListenerName, moduleTemplate), this))
    };
    Object.defineProperty(moduleTemplate, '__dataType', {writable: false, value: 'ModuleTemplate'});
    Object.defineProperty(moduleTemplate, '__isModuleTemplate', {writable: false, value: true});

    return moduleTemplate;
});

const defaultModuleCreateSignals = ((moduleContext, coreContext) => {
    // Загрузка компонентов модуля:
    // > Инициализация компонентов модуля:
    moduleContext.units.signal('init', coreContext);
    // > Регистрация обработчиков событий:
    moduleContext.units.signal('event', coreContext);
    // > Загрузка компонентов модуля:
    moduleContext.units.signal('load', coreContext);
    // > Загружены все основные элементы всех компонентов модуля:
    moduleContext.units.signal('launch', coreContext);
    // > Запуск модуля:
    moduleContext.units.signal('application', coreContext);

    // Упрощение доступа к вызовам модуля:
    moduleContext.signals.register('init', (async (moduleContext, coreContext) => {
        return await Promise.all(moduleContext.units.signal('moduleInit', coreContext));
    }));
    moduleContext.signals.register('event', (async (moduleContext, coreContext) => {
        return await Promise.all(moduleContext.units.signal('moduleEvent', coreContext));
    }));
    moduleContext.signals.register('load', (async (moduleContext, coreContext) => {
        return await Promise.all(moduleContext.units.signal('moduleLoad', coreContext));
    }));
    moduleContext.signals.register('launch', (async (moduleContext, coreContext) => {
        return await Promise.all(moduleContext.units.signal('moduleLaunch', coreContext));
    }));
    moduleContext.signals.register('application', (async (moduleContext, coreContext) => {
        return await Promise.all(moduleContext.units.signal('moduleApplication', coreContext));
    }));
});

module.exports = { moduleCreate, defaultModuleCreateSignals };



/***/ }),

/***/ "S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\config\\defaultLocalizationMutate.json":
/*!*******************************************************************************************!*\
  !*** S:\Ivan\Documents\GitHub\TankiOnlineDebugTool\config\defaultLocalizationMutate.json ***!
  \*******************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"ru":"ru-RU","en":"en-US","default":"ru"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libHelper\\entry-development.js");
/******/ 	__webpack_require__("S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\libWebpack\\entry-development.js");
/******/ 	__webpack_require__("S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineHooks\\entry-development.js");
/******/ 	__webpack_require__("S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineLoader\\entry-development.js");
/******/ 	__webpack_require__("S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\modules\\tankionlineWebpack\\entry-development.js");
/******/ 	var __webpack_exports__ = __webpack_require__("S:\\Ivan\\Documents\\GitHub\\TankiOnlineDebugTool\\src\\core\\entry-development.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=static-development.js.map