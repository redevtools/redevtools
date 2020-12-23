/**
 *
 * @type {{started: boolean}}
var state = {started: false}

var filter = {urls: ["<all_urls>"]};
var callback = function(details) {
    console.log("callback: ")
    if(!state.started){
        chrome.tabs.getCurrent( function(tab){
            console.log("tab: ",tab)
            if(tab){
                let tabId = tab.id
                console.log("tabId: ",tabId)
                tabs.executeScript(tabId, {file: "vue.js"})
                tabs.executeScript(tabId, {file: "rdt_tailwind.umd.min.js"})
                tabs.executeScript(tabId, {file: "start.js"})
                console.log("executeScript: ")
            }
        })
    }
};
var opt_extraInfoSpec = [];
chrome.webRequest.onBeforeRequest.addListener(
    callback, filter, opt_extraInfoSpec);
 */

console.log("chrome: ",chrome)
chrome.browserAction.onClicked.addListener(function(tab) { chrome.tabs.executeScript({file: 'popup.js'}) });
