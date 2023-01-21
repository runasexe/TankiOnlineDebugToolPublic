/**
 * A function that returns the globalContext.
 * 
 * If connectContext is present, values from it using in connections to user, extensions, etc.
 * */
const getGlobalContext = (() => {
    try {
        return globalContext;
    } catch(e) {};
    return globalThis;
});

/**
 * A function that returns the packageContext.
 * 
 * If packageContext is present, values from it using in scripts or packet of scripts.
 * For example, window.console transform to packageContext.console.
 * */
const getPackageContext = (() => {
    try {
        return packageContext;
    } catch(e) {};
    return {};
});

/**
 * A function that returns the runtimeContext.
 * 
 * If runtimeContext is present, values from it using in scripts.
 * For example, window.console transform to runtimeContext.console.
 * */
const getRuntimeContext = (() => {
    try {
        return runtimeContext;
    } catch(e) {};
    return {};
});

/**
 * A function that returns the debugContext.
 * 
 * If debugContext is present, values from it using in debug.
 * 
 * @param force - Force debug. Warning: Another scripts can detect this!
 * */
const getDebugContext = ((force) => {
    try {
        return debugContext;
    } catch(e) {};
    return (force ? getGlobalContext() : {});
});

/**
 * A function that returns the connectContext.
 * 
 * If connectContext is present, values from it using in scripts connections.
 * */
const getConnectContext = (() => {
    try {
        return connectContext;
    } catch(e) {};
    return getGlobalContext();
});

/**
 * A function that returns the domContext.
 * 
 * If domContext is present, values from it using in connections to DOM access, location, etc.
 * */
const getDOMContext = (() => {
    try {
        return domContext;
    } catch(e) {};
    return getGlobalContext();
});

/**
 * This is a function that returns the value of the variable by name.
 * 
 * @param name - Name for data load
 */
const getValue = ((name) => {
    const runtimeContext = getRuntimeContext();
    if(name in runtimeContext) {
        return runtimeContext[name];
    }
    const packageContext = getPackageContext();
    if(name in packageContext) {
        return packageContext[name];
    }
    const globalContext = getGlobalContext();
    if(name in globalContext) {
        return globalContext[name];
    }
    if(name in globalThis) {
        return globalThis[name];
    }
});

/**
 * A function that returns the document object.
 * */
const getDocument = (() => {
    const domContext = getDOMContext();
    return domContext.document;
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
    forceDebugContext: getDebugContext(true),
    debugContext: getDebugContext(false),
    runtimeContext: getRuntimeContext(),
    packageContext: getPackageContext(),
    connectContext: getConnectContext(),
    domContext: getDOMContext(),
    globalContext: getGlobalContext(),
    consoleContext: getValue('console'),
    getDocument,
    getValue,
    getInterpreterType
};
