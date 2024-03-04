setInterval(function (){
    var cur = window.location.hostname
    console.log(cur);
    cur = parseCurrent(cur);
    console.log(cur);

    chrome.storage.local.set({["current_website"]: cur}, functi0n () {});

    chrome.storage.local.get(["websites"], function (items){

        // get rid of parenthesis/quotes
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
    })
})