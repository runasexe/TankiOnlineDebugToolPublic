const { moduleCreate, defaultModuleCreateSignals } = require('/src/utils/module');

module.exports = moduleCreate('tankionlineWebpack', ((moduleContext, coreContext) => {
    // moduleContext.info.name = 'Tanki Online: Webpack';
    // moduleContext.info.version = '1.0.0';
    // moduleContext.info.versionAlpha = true;
    // moduleContext.info.versionBeta = false;
    
    moduleContext.units.register(require('./units/webpackStorage'));
}), defaultModuleCreateSignals);

