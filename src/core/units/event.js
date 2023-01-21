/**
 * Этот модуль содержит инструменты для определения и вызова событий.
 */

const { consoleContext } = require('/src/utils/context');

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

