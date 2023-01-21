const { moduleCreate, defaultModuleCreateSignals } = require('/src/utils/module');

module.exports = moduleCreate('tankionlineLoader', ((moduleContext, coreContext) => {
    // moduleContext.info.name = 'Tanki Online: Loader';
    // moduleContext.info.version = '1.0.0';
    // moduleContext.info.versionAlpha = true;
    // moduleContext.info.versionBeta = false;
    
    moduleContext.units.register(require('./units/gameLoader'));
    moduleContext.units.register(require('./units/gameScriptLoader'));
}), defaultModuleCreateSignals);

