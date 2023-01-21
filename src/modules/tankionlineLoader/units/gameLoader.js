const { getDocument } = require('/src/utils/context');
const { getPageContentRewriteStatus, getBaseRewriteStatus } = require('./../config');

const unitSignals = {
    init: ((moduleContext, coreContext) => {
        moduleContext.libHelper = null;

        moduleContext.webpackData = null;
		moduleContext.webpackSource = null;
    }),
    moduleLoad: (async (moduleContext, coreContext) => {
        moduleContext.libHelper = coreContext.modules.require('libHelper');
        let libTankionlineWebpack = coreContext.modules.require('tankionlineWebpack');

        moduleContext.webpackData = libTankionlineWebpack.webpackData;
		moduleContext.webpackSource = libTankionlineWebpack.webpackSource;
        
        await moduleContext.ScriptLoader.getMainScriptContentAuto(moduleContext.webpackSource, moduleContext.libHelper);
    }),
    moduleApplication: ((moduleContext, coreContext) => {
        if(!moduleContext.webpackSource.mainScriptWebpackElements || !moduleContext.webpackSource.mainScriptWebpackPath || !moduleContext.webpackSource.mainScriptWebpackEntry) {
            moduleContext.logger.error('Fail: webpackSource is corrupted: %O', moduleContext.webpackSource);
            return;
        }
        const document = getDocument();
        if(getPageContentRewriteStatus() && moduleContext.webpackSource.pageContent) {
            if (coreContext.event.dispatchEvent(new coreContext.ModuleEvent(moduleContext, "htmlRewrite.fullDocument", {cancelable: true}))) {
                document.firstChild.innerHTML = moduleContext.webpackSource.pageContent;
            }
        }
        if(getBaseRewriteStatus() && moduleContext.webpackSource.linkBase) { 
            if (coreContext.event.dispatchEvent(new coreContext.ModuleEvent(moduleContext, "htmlRewrite.headBase", {cancelable: true}))) {
                Array.from(document.getElementsByTagName('base')).map((element) => element.remove());
                let headElement = document.head;
                if(!headElement) {
                    let headList = document.getElementsByTagName('head');
                    if(headList.length) {
                        headElement = headList[0];
                    } else {
                        moduleContext.logger.warn('DOM base element load error: document.head');
                    }
                }
                if(headElement) {
                    let insertElement = document.createElement('base');
                    insertElement.setAttribute('href', moduleContext.webpackSource.linkBase);
                    headElement.insertBefore(insertElement, (headElement.firstChild || null));
                }
            }
        }

        if(coreContext.event.dispatchEvent(new coreContext.ModuleEvent(moduleContext, "dataLoad", {cancelable: true}))) {
            moduleContext.webpackData.modules = eval(moduleContext.webpackSource.mainScriptWebpackElements);
            moduleContext.webpackData.publicPath = moduleContext.webpackSource.mainScriptWebpackPath;
            moduleContext.webpackData.entryModule = moduleContext.webpackSource.mainScriptWebpackEntry;
        }

        if(moduleContext.webpackData.modules) {
            const entryModule = moduleContext.webpackData.entryModule;

            coreContext.event.dispatchEvent(new coreContext.ModuleEvent(moduleContext, "dataLoaded", {cancelable: false, detail: {
                webpackData: moduleContext.webpackData
            }}));

            if (coreContext.event.dispatchEvent(new coreContext.ModuleEvent(moduleContext, "entry.launch", {cancelable: true, detail: {
                webpackData: moduleContext.webpackData
            }}))) {
                const result = moduleContext.webpackData.loadEntryModule();
                coreContext.event.dispatchEvent(new coreContext.ModuleEvent(moduleContext, "entry.launched", {cancelable: false, detail: {
                    returnValue: result,
                    isOriginalModule: (entryModule == moduleContext.webpackData.entryModule)
                }}));
            }
        }
    })
};

module.exports = {
    unitSignals
};

