'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules(
      [{
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostSuffix: 'novelkeys.xyz'},
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostSuffix: 'cannonkeys.com'},
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }]
    );
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url.includes('products')) {
      chrome.pageAction.setPopup({
          tabId: tabId,
          popup: '../static/insert.html'
      });
  }
});
