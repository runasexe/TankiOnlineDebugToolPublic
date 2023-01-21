const { moduleCreate } = require('/src/utils/module');

module.exports = moduleCreate('libHelper', ((moduleContext, coreContext) => {
    // moduleContext.info.name = 'Lib Helper';
    // moduleContext.info.version = '1.0.0';
    // moduleContext.info.versionAlpha = true;
    // moduleContext.info.versionBeta = false;
    
    moduleContext.units.register(require('./units/objectHelper'));
    moduleContext.units.register(require('./units/functionHelper'));
    moduleContext.units.register(require('./units/stringHelper'));
    moduleContext.units.register(require('./units/linkHelper'));
}));

