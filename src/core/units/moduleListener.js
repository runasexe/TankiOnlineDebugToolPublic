const { connectContext, globalContext } = require('/src/utils/context');
const { Module } = require('./moduleManager');
const { moduleListenerName } = require('/config/moduleConnection');
const { GlobalEvent, CoreEvent } = require('./event');

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
 * Функция определения регистратора, возвращает проиниализированный регистратор
 */
ModuleListener.getModuleListener = ((coreContext, listenerName) => {
    if(connectContext instanceof EventTarget) {
        return new EventModuleListener(coreContext, connectContext, listenerName);
    } else {
        return new ContextModuleListener(coreContext, connectContext, listenerName);
    }
});

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