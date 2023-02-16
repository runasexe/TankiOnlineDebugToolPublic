/**
 * Мненджер webpack-модулей
 */
class WebpackModuleManager {
    installedModules = null;
    modules = null;

    constructor(modules) {
        this.modules = (modules || {});
        this.installedModules = [];
    }
};

/**
 * Мненджер webpack-модулей ES4
 */
class ES4WebpackModuleManager extends WebpackModuleManager {
    constructor(modules) {
        super(modules);

        const __webpack_require__ = (function (moduleId) {
            if (this.installedModules[moduleId]) {
                return this.installedModules[moduleId].exports;
            }
            let module = this.installedModules[moduleId] = {
                id: moduleId,
                loaded: false,
                exports: {}
            };
            this.modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.loaded = true;
            return module.exports;
        }).bind(this);

        __webpack_require__.m = this.modules;
        __webpack_require__.c = this.installedModules;

        this.harmonyExport = this.export = __webpack_require__.d = (function (exports, name, getter) {
            if (!__webpack_require__.o(exports, name)) {
                Object.defineProperty(exports, name, { enumerable: true, get: getter });
            }
        });

        __webpack_require__.r = (function (exports) {
            if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            }
            Object.defineProperty(exports, '__esModule', { value: true });
        });

        __webpack_require__.t = (function (value, mode) {
            if (mode & 1) value = __webpack_require__(value);
            if (mode & 8) return value;
            if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
            let ns = Object.create(null);
            __webpack_require__.r(ns);
            Object.defineProperty(ns, 'default', { enumerable: true, value: value });
            if (mode & 2 && typeof value != 'string') for (let key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
            return ns;
        });

        this.getDefaultExport = __webpack_require__.n = (function (module) {
            let getter = module && module.__esModule ?
                function getDefault() { return module['default']; } :
                function getModuleExports() { return module; };
            __webpack_require__.d(getter, 'a', getter);
            return getter;
        });
        __webpack_require__.o = (function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        });
        __webpack_require__.p = "";
        __webpack_require__.s = null;
        this.webpackRequire = this.__webpack_require__ = __webpack_require__;
    }

    installModule(id, callback, init) {
        this.modules[id] = callback;
        if (init) {
            return this.webpackRequire(id);
        }
    }

    get __webpack_public_path__() {
        return this.__webpack_require__.p;
    }

    set __webpack_public_path__(value) {
        this.__webpack_require__.p = value;
    }

    get publicPath() {
        return this.__webpack_require__.p;
    }

    set publicPath(value) {
        this.__webpack_require__.p = value;
    }

    get __webpack_entry__() {
        return this.__webpack_require__.s;
    }

    set __webpack_entry__(value) {
        this.__webpack_require__.s = value;
    }

    get entry() {
        return this.__webpack_require__.s;
    }

    set entry(value) {
        this.__webpack_require__.s = value;
    }

    get entryModule() {
        return this.__webpack_require__.s;
    }

    set entryModule(value) {
        this.__webpack_require__.s = value;
    }

    loadEntryModule(entry) {
        if (entry) {
            this.__webpack_require__.s = entry;
        }
        if (this.__webpack_require__.s instanceof Array) {
            this.__webpack_require__.s.forEach((e) => {
                this.webpackRequire(e);
            });
        } else {
            this.webpackRequire(this.__webpack_require__.s);
        }
    }

    webpackRequireList(moduleIdList) {
        let result = {};
        moduleIdList.map((e) => { result[e] = this.__webpack_require__(e) });
        return result;
    }
};


/**
 * Мненджер webpack-модулей ES5
 */
class ES5WebpackModuleManager extends WebpackModuleManager {
    entries = null;

    constructor(modules) {
        super(modules);
        this.entries = []

        const __webpack_require__ = ((moduleId) => {
            if (typeof (this.installedModules[moduleId]) != 'undefined') {
                return this.installedModules[moduleId].exports;
            }
            const module = this.installedModules[moduleId] = {
                id: moduleId,
                loaded: false,
                exports: {}
            };
            this.modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.loaded = true;
            return module.exports;
        }).bind(this);
        __webpack_require__.n = ((t) => {
            let n = (t && t.__esModule) ? (() => t.default) : (() => t);
            __webpack_require__.d(n, { a: n });
            return n;
        });
        __webpack_require__.d = (t, n) => {
            for (const r in n) {
                if (!__webpack_require__.o(n, r)) {
                    continue;
                }
                if (__webpack_require__.o(t, r)) {
                    continue;
                }
                Object.defineProperty(t, r, {
                    enumerable: true,
                    get: n[r]
                });
            }
        };
        __webpack_require__.g = ((function () {
            if ("object" == typeof (globalThis)) {
                return globalThis;
            }
            try {
                return (this || new Function("return this")());
            } catch (t) {
                if ("object" == typeof (window)) {
                    return window;
                }
            }
        })());
        __webpack_require__.hmd = ((t) => {
            (t = Object.create(t)).children || (t.children = []);
            Object.defineProperty(t, "exports", {
                enumerable: true,
                set: (() => {
                    throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: " + t.id)
                })
            });
            return t;
        });
        __webpack_require__.o = ((t, n) => Object.prototype.hasOwnProperty.call(t, n));
        __webpack_require__.r = ((t) => {
            if (typeof (Symbol) != "undefined" && Symbol.toStringTag) {
                Object.defineProperty(t, Symbol.toStringTag, {
                    value: "Module"
                });
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
        });

        this.webpackRequire = this.__webpack_require__ = __webpack_require__;
    }

    installModule(id, callback, init) {
        this.modules[id] = callback;
        if (init) {
            return this.webpackRequire(id);
        }
    }

    get __webpack_public_path__() {
        return this.__webpack_require__.p;
    }

    set __webpack_public_path__(value) {
        this.__webpack_require__.p = value;
    }

    get publicPath() {
        return this.__webpack_require__.p;
    }

    set publicPath(value) {
        this.__webpack_require__.p = value;
    }

    get __webpack_entry__() {
        return this.entries;
    }

    set __webpack_entry__(value) {
        this.entries = value;
    }

    get entry() {
        return this.entries;
    }

    set entry(value) {
        this.entries = value;
    }

    get entryModule() {
        return this.entries;
    }

    set entryModule(value) {
        this.entries = value;
    }

    loadEntryModule(entries) {
        this.entries = entries || this.entries || [];
        if (!(this.entries instanceof Array)) {
            this.entries = [this.entries];
        }
        this.entries.forEach((e) => {
            this.webpackRequire(e);
        });
    }

    webpackRequireList(moduleIdList) {
        let result = {};
        moduleIdList.map((e) => { result[e] = this.__webpack_require__(e) });
        return result;
    }
};

module.exports = {
    WebpackModuleManager,
    ES4WebpackModuleManager,
    ES5WebpackModuleManager,
    moduleCompareTable: {
        'es4': ES4WebpackModuleManager,
        'es5': ES5WebpackModuleManager
    }
};

