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

