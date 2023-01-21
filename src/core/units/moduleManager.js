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
        coreContext.modules.signals.signalAutoloadList.push('init');
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

