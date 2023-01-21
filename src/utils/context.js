const localGlobalContext = (() => {
    try {
        return globalContext;
    } catch(e) {};
    return globalThis;
})();

const localPackageContext = (() => {
    try {
        return packageContext;
    } catch(e) {};
    return {};
})();
const localRuntimeContext = (() => {
    try {
        return runtimeContext;
    } catch(e) {};
    return {};
})();
const localConnectContext = (() => {
    try {
        return connectContext;
    } catch(e) {};
    return (localRuntimeContext || localPackageContext || localGlobalContext);
})();
const localDOMContext = (() => {
    try {
        return domContext;
    } catch(e) {};
    return localGlobalContext;
})();

const getDebugContext = ((force) => {
    try {
        return debugContext;
    } catch(e) {};
    return (force ? localGlobalContext : {});
});
const getValue = ((name) => {
    if(name in localRuntimeContext) {
        return localRuntimeContext[name];
    }
    if(name in localPackageContext) {
        return localPackageContext[name];
    }
    if(name in localGlobalContext) {
        return localGlobalContext[name];
    }
    if(name in globalThis) {
        return globalThis[name];
    }
});
const getDocument = (() => {
    return localDOMContext.document;
});
const getInterpreterType = (() => {
    if(globalThis.constructor && globalThis.constructor.name) {
        if(globalThis.constructor.name.toLowerCase() == 'window') {
            return 'Browser';
        }
    }
    if(globalThis instanceof EventTarget) {
        return 'Browser';
    }
    if(globalThis.navigator && globalThis.navigator.userAgent) {
        return 'Browser';
    }
    if(globalThis.navigator && globalThis.navigator.cookieEnabled) {
        return 'Browser';
    }
    if(globalThis.performance && globalThis.performance.nodeTiming) {
        return 'NodeJS';
    }
    return 'Unknown';
});

module.exports = {
    globalContext: localGlobalContext,
    packageContext: localPackageContext,
    runtimeContext: localRuntimeContext,
    connectContext: localConnectContext,
    domContext: localDOMContext,
    
    consoleContext: getValue('console'),

    forceDebugContext: getDebugContext(true),
    debugContext: getDebugContext(false),
    getDocument,
    getValue,
    getInterpreterType
};
