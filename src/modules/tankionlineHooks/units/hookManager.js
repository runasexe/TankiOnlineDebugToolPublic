const unitSignals = {
    init:((moduleContext, coreContext) => {
		moduleContext.hooks = [];
    }),
    event: ((moduleContext, coreContext) => {
		coreContext.event.addEventListener("tankionlineLoader.entry.launch", ((event) => {
            const webpackData = coreContext.modules.require('tankionlineWebpack').webpackData;
            for (const hookName in moduleContext.hooks) {
                const hookInfo = moduleContext.hooks[hookName];
                if(hookInfo && hookInfo.enabled && hookInfo.callback) {
                    hookInfo.callback(webpackData, hookInfo)
                }
            }
        }));
    })
};

module.exports = {
    unitSignals
};

