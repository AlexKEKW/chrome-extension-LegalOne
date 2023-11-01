// chrome.browserAction.onClicked.addListener( function(tab) {
//     chrome.windows.create({ url: chrome.runtime.getURL("popup.html") });
// });

chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
        chrome.tabs.create({
            url: "welcome.html"
        });
    }
});
