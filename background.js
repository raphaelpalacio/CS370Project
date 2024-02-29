chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    const url = new URL(details.url);
    let blockedSites = [];
    chrome.storage.local.get(['blockedSites'], function(result) {
      blockedSites = result.blockedSites || [];
    });
    if (blockedSites.includes(url.hostname)) {
      return { cancel: true };
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);