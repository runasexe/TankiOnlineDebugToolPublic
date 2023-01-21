/**
 * Этот модуль содержит процедуру запуска для браузера.
 */

const { globalContext } = require('/src/utils/context');
const { CoreEvent } = require('./event');

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

