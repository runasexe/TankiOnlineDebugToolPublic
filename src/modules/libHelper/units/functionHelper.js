class FunctionHook {
    originalFunction = null;
    this = null;
    args = null;
    result = (void 0);

    constructor(originalFunction, runtimeThis, runtimeArgs) {
        this.originalFunction = originalFunction;
        this.runtimeThis = runtimeThis;
        this.args = runtimeArgs;
        this.result = (void 0);
    }

    callOriginal() {
        this.result = this.originalFunction.apply(this.this, this.args);
    }
};

class FunctionHelper {
    static pathFunction(object, propertyName, hookCallback) {
        if((!(propertyName in object)) || (typeof(object[propertyName]) != 'function')) {
            return false;
        }
        const originalFunction = object[propertyName];
        object[propertyName] = (function (...args) {
            let hookObject = new FunctionHook(originalFunction, this, args);
            hookCallback(hookObject);
            return hookObject.result;
        });
    }

    static pathFunctionSimpleBefore(object, propertyName, hookCallback) {
        if((!(propertyName in object)) || (typeof(object[propertyName]) != 'function')) {
            return false;
        }
        const originalFunction = object[propertyName];
        object[propertyName] = (function (...args) {
            hookCallback.apply(this, args);
            return originalFunction.apply(this, args);
        });
    }

    static pathFunctionSimpleAfter(object, propertyName, hookCallback) {
        if((!(propertyName in object)) || (typeof(object[propertyName]) != 'function')) {
            return false;
        }
        const originalFunction = object[propertyName];
        object[propertyName] = (function (...args) {
            let result = originalFunction.apply(this, args);
            hookCallback.apply(this, args);
            return result;
        });
    }
};

module.exports = {
    FunctionHook,
    FunctionHelper
};

