const { TankiOnlineHook } = require('./../hookManager');

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

