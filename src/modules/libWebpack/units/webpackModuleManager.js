/**
 * Мненджер webpack-модулей
 */
class WebpackModuleManager {
    installedModules = null;
    modules = null;

    constructor(modules) {
        this.modules = (modules || {});
        this.installedModules = [];

        const __webpack_require__ = (function (moduleId) {
            if (this.installedModules[moduleId]) {
                return this.installedModules[moduleId].exports;
            }
            let module = this.installedModules[moduleId] = {
                i: moduleId,
                l: false,
                exports: {}
            };
            this.modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = true;
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
        if(entry) {
            this.__webpack_require__.s = entry;
        }
        this.webpackRequire(this.__webpack_require__.s);
    }

    webpackRequireList(moduleIdList) {
        let result = {};
        moduleIdList.map((e) => {result[e] = this.__webpack_require__(e)});
        return result;
    }
};

module.exports = {
    WebpackModuleManager
};

