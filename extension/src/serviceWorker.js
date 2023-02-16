/**
 * Основной фоновый скрипт
 */

const baseRuleId = 10;

(() => {
    /* chrome.scripting.registerContentScripts([{
        id: "game",
        js: [
            "/dist/content/game.js"
        ],
        "css": [
            "./dist/content/game.css"
        ],
        matches: [
            "*://tankionline.com/play/*",
            "*://*.tankionline.com/play/*",
            "*://tankionline.com/browser-public/*",
            "*://*.tankionline.com/browser-public/*",
            "*://tankionline.com/browser-private/*",
            "*://*.tankionline.com/browser-private/*"
        ],
        runAt: "document_start"
        // runAt: "document_start",
        // runAt: "document_end",
        // world: "MAIN"
    }]); */
    ([
        (([
            "^https?:\\/\\/(?:www\\.)?",
            "(?:(?:.*\\.)?test-eu\\.)?",
            "tankionline\\.com\\/",
            "(play|browser-public|browser-private)",
            "\\/static\\/js\\/main\\.[0-9a-f]{8}\\.js$"
        ]).join(''))
    ]).forEach((e, i) => {
        chrome.declarativeNetRequest.updateDynamicRules({
            'addRules': [{
                "id": (i + baseRuleId),
                "priority": 1,
                "action": { "type": "block" },
                "condition": {
                    "regexFilter": e,
                    "initiatorDomains": [
                        "tankionline.com",
                        "www.tankionline.com",
                        "*.tankionline.com"
                    ],
                    "resourceTypes": ["script"]
                }
            }], 'removeRuleIds': [(i + baseRuleId)]
        });
    });
})();

