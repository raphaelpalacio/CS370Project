window.onload = function () {
    document.getElementById("submitButton").onclick = save;
    document.getElementById("clearButton").onclick = clear;
  };
  
  setInterval(function () {
    chrome.storage.local.get(["current_website"], function (items) {
      //console.log(items.current_website);
  
      var current = items.current_website;
  
      console.log(current);
  
      if (document.getElementById("currentLink").innerHTML !== current) {
        document.getElementById("currentLink").innerHTML = current;
      }
    });
  }, 1000);
  
  const placeholder_link = "www.youtube.com";
  
  // Checks if key exists
  
  if (localStorage.getItem("website_names") !== null) {
    var x = localStorage.getItem("website_names");
  
    var formatted = x.toString().slice(1, -1).replace(/['"]+/g, "");
  
    // splitted = local storage array
    var splitted = formatted.toString().split(",");
  
    if (splitted[0] === "") {
      document.getElementById("textbox").placeholder = placeholder_link;
    } else {
      document.getElementById("textbox").value = splitted[0];
    }
  
    if (splitted[1] === "") {
      document.getElementById("textbox2").placeholder = placeholder_link;
    } else {
      document.getElementById("textbox2").value = splitted[1];
    }
  
    if (splitted[2] === "") {
      document.getElementById("textbox3").placeholder = placeholder_link;
    } else {
      document.getElementById("textbox3").value = splitted[2];
    }
  
    if (splitted[3] === "") {
      document.getElementById("textbox4").placeholder = placeholder_link;
    } else {
      document.getElementById("textbox4").value = splitted[3];
    }
  
    if (splitted[4] === "") {
      document.getElementById("textbox5").placeholder = placeholder_link;
    } else {
      document.getElementById("textbox5").value = splitted[4];
    }
  } else {
    document.getElementById("textbox").placeholder = placeholder_link;
    document.getElementById("textbox2").placeholder = placeholder_link;
    document.getElementById("textbox3").placeholder = placeholder_link;
    document.getElementById("textbox4").placeholder = placeholder_link;
    document.getElementById("textbox5").placeholder = placeholder_link;
  }
  
  // !parseLink(name)
  function save() {
    var name = document.getElementById("textbox").value.toString().toLowerCase();
  
    if (name.toString().length !== 0) {
      if (!parseLink(name)) {
        document.getElementById("errorMessage").innerHTML = "Invalid URL";
      } else {
        console.log("in here");
        document.getElementById("errorMessage").innerHTML = "";
      }
    }
  
    var name2 = document
      .getElementById("textbox2")
      .value.toString()
      .toLowerCase();
  
    if (name2.toString().length !== 0) {
      console.log(name2.toString().length);
      if (!parseLink(name2)) {
        document.getElementById("errorMessage").innerHTML = "Invalid URL";
      } else {
        console.log("in here");
        document.getElementById("errorMessage").innerHTML = "";
      }
    }
    var name3 = document
      .getElementById("textbox3")
      .value.toString()
      .toLowerCase();
  
    if (name3.toString().length !== 0) {
      if (!parseLink(name3)) {
        document.getElementById("errorMessage").innerHTML = "Invalid URL";
      } else {
        console.log("in here");
        document.getElementById("errorMessage").innerHTML = "";
      }
    }
  
    var name4 = document
      .getElementById("textbox4")
      .value.toString()
      .toLowerCase();
  
    if (name4.toString().length !== 0) {
      if (!parseLink(name4)) {
        document.getElementById("errorMessage").innerHTML = "Invalid URL";
      } else {
        console.log("in here");
        document.getElementById("errorMessage").innerHTML = "";
      }
    }
  
    var name5 = document
      .getElementById("textbox5")
      .value.toString()
      .toLowerCase();
  
    if (name5.toString().length !== 0) {
      if (!parseLink(name5)) {
        document.getElementById("errorMessage").innerHTML = "Invalid URL";
      } else {
        console.log("in here");
        document.getElementById("errorMessage").innerHTML = "";
      }
    }
  
    var names_formatted =
      '["' + name + "," + name2 + "," + name3 + "," + name4 + "," + name5 + '"]';
  
    document.getElementById("textbox").value = name;
  
    if (localStorage.getItem("website_names") == null) {
      localStorage.setItem("website_names", "[]");
    }
    localStorage.setItem("website_names", names_formatted);
  }
  
  function clear() {
    localStorage.clear();
    document.getElementById("textbox").value = "";
    document.getElementById("textbox2").value = "";
    document.getElementById("textbox3").value = "";
    document.getElementById("textbox4").value = "";
    document.getElementById("textbox5").value = "";
    document.getElementById("textbox").placeholder = placeholder_link;
    document.getElementById("textbox2").placeholder = placeholder_link;
    document.getElementById("textbox3").placeholder = placeholder_link;
   
    
    document.getElementById("textbox5").placeholder = placeholder_link;
  }
  
  function parseLink(url) {
    var isValid = -1;
  
    const url_pattern1 = new RegExp("^[www]+[.]");
  
    isValid = url_pattern1.test(url);
    console.log(isValid);
  
    return isValid;
  }