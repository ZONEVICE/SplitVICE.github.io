const LINKS_BODY_CONTENT_PATH = "body-content.html";

function LOAD_BODY_CONTENT_WITH_AJAX() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("LINKS_BODY_CONTENT").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", LINKS_BODY_CONTENT_PATH, true);
    xhttp.send();
  }