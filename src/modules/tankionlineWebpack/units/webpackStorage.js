const unitSignals = {
    moduleInit: ((moduleContext, coreContext) => {
        let libWebpackModule = coreContext.modules.require('libWebpack');
        
        moduleContext.webpackData = new libWebpackModule.AdvancedWebpackModuleManager();
		moduleContext.webpackSource = {};
    })
};

module.exports = {
    unitSignals
};

