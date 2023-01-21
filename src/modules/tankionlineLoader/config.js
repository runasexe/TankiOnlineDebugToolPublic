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
    return {
        linkGamePage: baseGamePage,
        linkReferer: baseGamePage
    }
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

