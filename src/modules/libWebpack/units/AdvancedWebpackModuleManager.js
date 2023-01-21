const { WebpackModuleManager } = require('./WebpackModuleManager');

class AdvancedWebpackModuleManager extends WebpackModuleManager {
    getExports(searchData, resultOnce) {
        const className = searchData.split('.').pop();
        this.webpackRequireList(this.searchMetadataClass(className));
        const searchResult = this.searchExports(searchData, resultOnce);
        if(resultOnce) {
            return searchResult;
        }
        const resultList = [];
        for (const moduleId in searchResult) {
            resultList.push(searchResult[moduleId]);
        }
        return resultList;
    }
    searchMetadataClass(searchClass, resultOnce) {
        return this.searchSource('simpleName:"' + searchClass + '"', resultOnce);
    }
    searchMetadataClassRegEx(searchClass, resultOnce) {
        return this.searchSourceRegEx(
            new RegExp('\\$metadata\\$={(?:kind:[^:]+,)?simpleName:"(?:' + (searchClass ? searchClass : '[^{}]+') + ')"(?:,interfaces:)?'), resultOnce
        );
    }
    searchSource(searchCode, resultOnce) {
        const availableModules = [];
        for (const moduleId in this.modules) {
            if (this.modules[moduleId].toString().indexOf(searchCode) != (-1)) {
                availableModules.push(moduleId);
            }
        }
        if (resultOnce) {
            return availableModules.shift();
        }
        return availableModules;
    }
    searchSourceRegEx(searchCodeRegEx, resultOnce) {
        const availableModules = [];
        for (const moduleId in this.modules) {
            if (searchCodeRegEx.test(this.modules[moduleId].toString())) {
                availableModules.push(moduleId);
            }
        }
        if (resultOnce) {
            return availableModules.shift();
        }
        return availableModules;
    }
    searchExports(searchData, resultOnce) {
        if (typeof(searchData) == "string") {
            searchData = searchData.split(".");
        }
        let availableModules = {};
        const searchDataRuntime = Array.from(searchData);
        let searchValue = null;

        for (const moduleId in this.installedModules) {
            if (this.installedModules[moduleId].exports === null) {
                continue;
            }
            if (
                typeof this.installedModules[moduleId].exports != "object" &&
                typeof this.installedModules[moduleId].exports != "function"
            ) {
                continue;
            }
            availableModules[moduleId] = this.installedModules[moduleId].exports;
        }
        while ((searchValue = searchDataRuntime.shift())) {
            const availableModulesNext = {};
            for (const moduleId in availableModules) {
                if (!Object.hasOwnProperty.call(availableModules[moduleId], searchValue)) {
                    continue;
                }
                if (typeof availableModules[moduleId][searchValue] === null) {
                    continue;
                }
                if (
                    (typeof availableModules[moduleId][searchValue] != "object") &&
                    (typeof availableModules[moduleId][searchValue] != "function")
                ) {
                    continue;
                }
                availableModulesNext[moduleId] = availableModules[moduleId][searchValue];
            }
            availableModules = availableModulesNext;
        }
        if (resultOnce) {
            for (const moduleId in availableModules) {
                return availableModules[moduleId];
            }
        }
        return availableModules;
    }
}

module.exports = {
    AdvancedWebpackModuleManager
};

