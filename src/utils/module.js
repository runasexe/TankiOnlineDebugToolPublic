const { connectContext } = require('./context');
const { moduleListenerName } = require('/config/moduleConnection');

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


const moduleSend = ((shareContext, shareKey, moduleTemplate) => {
    if(shareContext instanceof EventTarget) {
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

