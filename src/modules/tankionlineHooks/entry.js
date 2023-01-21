const { moduleCreate, defaultModuleCreateSignals } = require('/src/utils/module');

module.exports = moduleCreate('tankionlineHooks', ((moduleContext, coreContext) => {
    // moduleContext.info.name = 'Tanki Online: Hooks';
    // moduleContext.info.version = '1.0.0';
    // moduleContext.info.versionAlpha = true;
    // moduleContext.info.versionBeta = false;
    
    moduleContext.units.register(require('./units/hookManager'));
    moduleContext.units.register(require('./units/hooks/fastOpenContainerHook'));
    moduleContext.units.register(require('./units/hooks/battleMessagesHook'));
}), defaultModuleCreateSignals);

