

setInterval(function () {
    var cur = window.location.hostname;
  
    console.log(cur);
  
    cur = parseCurrent(cur);
  
    console.log(cur);
  
  
    chrome.storage.local.set({["current_website"]: cur }, function () {});
  
    chrome.storage.local.get(["websites"], function (items) {
  
      // gets rid of parenthesis/quoutes
      var formatted = items.websites
        .toString()
        .slice(1, -1)
        .replace(/['"]+/g, "");
  
        console.log(formatted);
  
      // splits each of the 5 urls into it's own array index
      var splitted = formatted.toString().split(",");
  
      var website1 = splitted[0];
      var website2 = splitted[1];
      var website3 = splitted[2];
      var website4 = splitted[3];
      var website5 = splitted[4];
  
  
  
  
  
      if (website1 == cur) {
        console.log("tyest");
          window.location.replace(
            "https://raphaelpalacio.github.io/PersonalWebsite/"
          );
          
      }
      else if (website2 == cur) {
        console.log("tyest");
          window.location.replace(
            "https://raphaelpalacio.github.io/PersonalWebsite/"
          );
          
      }
      else if (website3 == cur) {
        console.log("tyest");
          window.location.replace(
            "https://raphaelpalacio.github.io/PersonalWebsite/"
          );
          
      }
      else if (website4 == cur) {
        console.log("tyest");
          window.location.replace(
            "https://raphaelpalacio.github.io/PersonalWebsite/"
          );
          
      }
      else if (website5 == cur) {
        console.log("tyest");
          window.location.replace(
            "https://raphaelpalacio.github.io/PersonalWebsite/"
          );
      }
    });
  }, 1000);
  
  
  
  function parseCurrent (currentURL) {
  
    const pre = "www.";
  
    if (!currentURL.toString().startsWith("www.")) {
      var newLink = pre + currentURL;
      console.log(newLink);
      return newLink;
    }
    return currentURL; 
  }
  
  
  console.log("This is from main script");