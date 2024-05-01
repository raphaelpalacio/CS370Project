setInterval(function () {
    var names = localStorage.getItem("website_names");
    console.log(names);
  
    // Save it using the Chrome extension storage API.
    chrome.storage.local.set({ 'websites': names }, function () {
      console.log("Settings saved");
    });
  }, 1000);
  
  