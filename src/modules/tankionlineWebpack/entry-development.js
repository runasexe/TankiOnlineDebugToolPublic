const moduleTemplate = require('./entry');
const { forceDebugContext } = require('/src/utils/context');
const { debugName } = require('/config/debug');

moduleTemplate.constructors.unshift((moduleContext) => {
    forceDebugContext[debugName] = (forceDebugContext[debugName] || {});
    Object.defineProperty(forceDebugContext[debugName], moduleContext.id, {
        writable: false,
        value: moduleContext
    });
});
moduleTemplate.send();

module.exports = moduleTemplate;

