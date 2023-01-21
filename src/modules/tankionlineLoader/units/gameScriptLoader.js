const { paramOriginalScript, paramOriginalPage, mutatePage, mutateScript, getGameInfo } = require('./../config');
const { getDocument, domContext } = require('/src/utils/context');

class NetworkUtils {
    static async getContent(linkPage, linkReferer) {
        let response = await fetch(linkPage, {
            referrer: linkReferer,
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            method: "GET",
            mode: "cors",
            credentials: "omit"
        });
        if (response.status !== 200) {
            return null;
        }
        let pageContent = await response.text();
        if(!pageContent) {
            return null;
        }
        return pageContent;
    }
};
class GameInfoCollector {
    libHelper = null;
    linkGamePage = null;
    linkReferer = null;

    constructor(libHelper, linkGamePage, linkReferer) {
        this.libHelper = libHelper;
        this.linkGamePage = linkGamePage;
        this.linkReferer = linkReferer;
    }

    getGamePage() {
        const forceGamePage = this.libHelper.LinkHelper.getQueryVariable(paramOriginalPage);
        if(forceGamePage) {
            return forceGamePage;
        }
        if(this.linkGamePage) {
            return mutatePage(this.linkGamePage, domContext.location.href);
        }
        return null;
    }

    getGameScript(gameScript) {
        const forceGameScript = this.libHelper.LinkHelper.getQueryVariable(paramOriginalScript);
        if(forceGameScript) {
            return forceGameScript;
        }
        if(gameScript) {
            return mutateScript(gameScript, this.getGamePage(), domContext.location.href);
        }
        return null;
    }

    getGameInfo() {
        return null;
    }
};
class ParamGameInfoCollector extends GameInfoCollector {
    getGameInfo() {
        const originalScript = this.getGameScript();
        if(!originalScript) {
            return null;
        }
        return {
            linkScript: this.libHelper.LinkHelper.linkAbsolute(originalScript, this.getGamePage()),
            linkBase: this.libHelper.LinkHelper.getBase(this.getGamePage())
        };
    }
};
class DocumentGameInfoCollector extends GameInfoCollector {
    getGameInfo() {
        let scriptElement = getDocument().querySelector(
            'script[src*="main."][src*=".js"][src^="/"]:not([src^="//"])'
        );
        if (!scriptElement) {
            return null;
        }
        return {
            linkScript: this.getGameScript(this.libHelper.LinkHelper.linkAbsolute(scriptElement.getAttribute("src"), this.linkGamePage)),
            linkBase: this.libHelper.LinkHelper.getBase(this.getGamePage()),
            scriptLoaded: true
        };
    }
};
class SourceGameInfoCollector extends GameInfoCollector {
    async getGameInfo() {
        const pageContent = await NetworkUtils.getContent(this.getGamePage(), this.linkReferer);
        if(!pageContent) {
            return;
        }
        const contentQuery = /<script[^>]+src="([^">]+main.[0-9a-f]{8}.js)"[^>]*><\/script>/i.exec(pageContent);
        if(!contentQuery) {
            return null;
        }
        return {
            linkScript: this.getGameScript(this.libHelper.LinkHelper.linkAbsolute(contentQuery[1], this.getGamePage())),
            linkBase: this.libHelper.LinkHelper.getBase(this.getGamePage()),
            pageContent: pageContent.replace(/<script[^>]+src="[^">]+"[^>]*><\/script>/i, '')
        };
    }
};
class ScriptLoader {
    static parseMainScript(scriptContent) {
        if(!scriptContent) {
            return null;
        }
        let scriptContentPosition = scriptContent.indexOf("}([function(t,e,n){") + 2;
        let sourceData = {
            mainScriptWebpackElements: scriptContent.substring(scriptContentPosition, scriptContent.lastIndexOf("]") + 1),
            mainScriptWebpackPath: null,
            mainScriptWebpackEntry: null
        }
        scriptContent = scriptContent.substring(0, scriptContentPosition);
        sourceData.mainScriptWebpackPath = scriptContent.substring(scriptContent.lastIndexOf(',n.p="') + 6, scriptContent.lastIndexOf('",n(n.s='));
        sourceData.mainScriptWebpackEntry = parseInt(scriptContent.substring(scriptContent.lastIndexOf('",n(n.s=') + 8,scriptContent.lastIndexOf(")")));
        return sourceData;
    }
    static async getMainScriptContentAuto(webpackSource, libHelper) {
        const { linkGamePage, linkReferer } = getGameInfo();
        const methodsAvailable = [
            new ParamGameInfoCollector(libHelper, linkGamePage, linkReferer),
            // new DocumentGameInfoCollector(libHelper, linkGamePage, linkReferer),
            new SourceGameInfoCollector(libHelper, linkGamePage, linkReferer)
        ];
        let methodResult;
        let scriptInfo = null;

        for(let methodId = 0; methodId < methodsAvailable.length; methodId++) {
            methodResult = methodsAvailable[methodId].getGameInfo();
            if(methodResult instanceof Promise) {
                methodResult = await methodResult;
            }
            if(!methodResult || !methodResult.linkScript || methodResult.scriptLoaded) {
                continue;
            }
            scriptInfo = methodResult;
            break;
        }
        if(!scriptInfo) {
            return;
        }
        const scriptData = ScriptLoader.parseMainScript(await NetworkUtils.getContent(scriptInfo.linkScript, linkReferer));
        if(scriptData) {
            Object.assign(scriptInfo, scriptData);
        }
        Object.assign(webpackSource, scriptInfo);
    }
};

module.exports = {
    ScriptLoader
}