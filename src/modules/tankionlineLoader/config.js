const { domContext } = require('/src/utils/context');

const baseGamePage = 'https://tankionline.com/play/';

const mutatePage = ((linkGamePage, linkCurrent) => {
    let currentRegExp;
    if(currentRegExp = /^([^\/]+?:\/\/[^\/]+)\/hook(\/.*)$/.exec(linkCurrent)) {
        return currentRegExp[1] + currentRegExp[2];
    }
    if(currentRegExp = /^([^\/]+?:\/\/[^\/]+\/.*\/)hook\/?$/.exec(linkCurrent)) {
        return currentRegExp[1];
    }
    return linkGamePage;
});

const getGameInfo = (() => {
    const gameInfo = {
        linkGamePage: baseGamePage,
        linkReferer: baseGamePage
    };
    
    let baseURL = new URL(domContext.location.href);

    if(/^(?:.+\.)?tankionline\.com$/.test(baseURL.host)) {
        if(/^\/(?:play|browser-(?:public|private))\//.test(baseURL.pathname)) {
            gameInfo.linkGamePage = baseURL.toString();
            gameInfo.linkReferer = baseURL.toString();
        }
    }

    return gameInfo;
});

module.exports = {
    paramOriginalScript: 'forceScript',
    paramOriginalPage: 'forcePage',
    mutatePage,
    mutateScript: ((linkScript, linkGamePage, linkCurrent) => linkScript),
    getGameInfo,
    getPageContentRewriteStatus: (() => true),
    getBaseRewriteStatus: (() => true),
};

