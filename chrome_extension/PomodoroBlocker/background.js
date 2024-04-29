chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      chrome.tabs.create({
        url: "https://main.d3fglo5dla6dtl.amplifyapp.com/"
      });
    }
  });