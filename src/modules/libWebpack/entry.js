const { moduleCreate } = require('/src/utils/module');

module.exports = moduleCreate('libWebpack', ((moduleContext, coreContext) => {
    // moduleContext.info.name = 'Lib Webpack';
    // moduleContext.info.version = '1.0.0';
    // moduleContext.info.versionAlpha = true;
    // moduleContext.info.versionBeta = false;

    moduleContext.units.register(require('./units/WebpackModuleManager'));
    moduleContext.units.register(require('./units/AdvancedWebpackModuleManager'));
}));

