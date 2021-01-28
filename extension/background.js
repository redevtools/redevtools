/* global chrome */

var disabledTabIds = [];
function isCSPDisabled(tabId){
    return disabledTabIds.indexOf(tabId) >= 0
}
// List of tabIds where CSP headers are disabled

var disableCSP = function (tabId) {
    if (isCSPDisabled(tabId)) {
        // remove this tabId from disabledTabIds
        disabledTabIds = disabledTabIds.filter(function (val) {
            return val !== tabId;
        });
    } else {
        disabledTabIds.push(tabId);

        // Sites that use Application Cache to cache their HTML document means this
        // extension is not able to alter HTTP response headers (as there is no HTTP
        // request when serving documents from the cache).
        //
        // An example page that this fixes is https://web.whatsapp.com
        chrome.browsingData.remove({}, { serviceWorkers: true }, function () {});
    }

};

var onHeadersReceived = function (details) {

    for (var i = 0; i < details.responseHeaders.length; i++) {
        if (details.responseHeaders[i].name.toLowerCase() === 'content-security-policy') {
            details.responseHeaders[i].value = '';
        }
    }

    return {
        responseHeaders: details.responseHeaders
    };
};


var init = function () {
    // When Chrome recieves some headers
    var onHeaderFilter = { urls: ['*://*/*'], types: ['main_frame', 'sub_frame'] };
    chrome.webRequest.onHeadersReceived.addListener(
        onHeadersReceived, onHeaderFilter, ['blocking', 'responseHeaders']
    );

    // When the user changes tab
    chrome.tabs.onActivated.addListener(function (activeInfo) {
        disableCSP(activeInfo.tabId);
    });

};

init();