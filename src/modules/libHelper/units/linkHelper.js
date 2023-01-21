const { domContext } = require('/src/utils/context');

class LinkHelper {
    static getRoot(link) {
        const result = /^(?:[^\/]*:\/\/)?[^\/]+/.exec(link);
        if(result) {
            return result[0];
        }
        return link;
    }
    static getBase(link) {
        const result = /^[^?#]+\//.exec(link);
        if(result) {
            return result[0];
        }
        return link;
    }
    static linkAbsolute(link, linkPage) {
        if(!link || !linkPage) {
            return null;
        }
        if(link.startsWith('//')) {
            return 'https://' + link.slice(2);
        }
        if(link.startsWith('/')) {
            return LinkHelper.getRoot(linkPage) + link;
        }
        return LinkHelper.getBase(linkPage) + link;
    }
    static linkWithoutPage(originalLink) {
        let execResult = /^.*\//.exec(originalLink);
        if(execResult) {
            return execResult[0];
        }
        return originalLink;
    }
	static getSearchInURL(link) {
		if(!link) {
			return null;
		}
		const search = /\?([^#]*)/.exec(link);
		if(!search) {
			return null;
		}
		return search[1];
	}
    static getQueryVariable(paramName, location) {
        let vars = (LinkHelper.getSearchInURL(location) || domContext.location.search).substring(1).split('&');
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) == paramName) {
                return decodeURIComponent(pair[1]);
            }
        }
        return null;
    }
};

module.exports = {
    LinkHelper
}

