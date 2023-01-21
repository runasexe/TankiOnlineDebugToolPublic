const moduleContext = require('./entry');
const { forceDebugContext } = require('/src/utils/context');
const { debugName } = require('/config/debug');

moduleContext.info.versionDevelopment = true;
forceDebugContext[debugName] = (forceDebugContext[debugName] || {});
Object.defineProperty(forceDebugContext[debugName], moduleContext.id, {
    writable: false,
    value: moduleContext
});

module.exports = moduleContext;

