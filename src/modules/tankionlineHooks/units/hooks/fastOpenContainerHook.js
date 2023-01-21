const unitSignals = {
    load:((moduleContext, coreContext) => {
		moduleContext.hooks['FastOpenContainerHook'] = {
            enabled: true,
            callback: ((webpackData, hookInfo) => {
                const AnimationOpenContainerComponent = webpackData.getExports('tanks.clients.html5.lobby.containers.AnimationOpenContainerComponent', true);
                hookInfo.onContainerAccelerateCalc = ((...args) => {
                    return 1;
                });
                AnimationOpenContainerComponent.prototype.accelerate_0 = ((...args) => {
                    return hookInfo.onContainerAccelerateCalc.apply(null, args);
                });
            })
        };
    })
};

module.exports = {
    unitSignals
};

